import { milvusClient, COLLECTION_NAME } from '../utils/milvus/client';
import { samplePosts } from '../seed-posts';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Reuse the existing getEmbeddingWithRetry function from seed-posts.js
async function getEmbeddingWithRetry(text: string, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: text,
          model: "text-embedding-3-small"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      return data[0].embedding;
    } catch (error) {
      console.log(`Attempt ${i + 1} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

async function seedMilvus() {
  try {
    console.log('Starting Milvus seeding...');

    // Process posts in batches
    const batchSize = 5;
    for (let i = 0; i < samplePosts.length; i += batchSize) {
      const batch = samplePosts.slice(i, i + batchSize);
      
      console.log(`Processing batch ${i / batchSize + 1} of ${Math.ceil(samplePosts.length / batchSize)}`);
      
      // Generate embeddings for batch
      const embeddings = await Promise.all(
        batch.map(post => getEmbeddingWithRetry(post.content))
      );

      // Prepare data for insertion
      const data = batch.map((post, index) => ({
        content: post.content,
        author: post.author,
        username: post.username,
        image: post.image,
        likes: post.likes,
        retweets: post.retweets,
        comments: post.comments,
        embedding: embeddings[index]
      }));

      // Insert batch
      await milvusClient.insert({
        collection_name: COLLECTION_NAME,
        data
      });

      console.log(`Inserted batch ${i / batchSize + 1}`);
      // Add delay between batches to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Milvus seeding completed!');
  } catch (error) {
    console.error('Error seeding Milvus:', error);
    throw error;
  }
}

seedMilvus().catch(console.error); 