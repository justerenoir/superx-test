import { NextRequest, NextResponse } from 'next/server';
import { milvusClient, COLLECTION_NAME } from '@/utils/milvus/client';

async function getEmbedding(text: string) {
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
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const { data } = await response.json();
    return data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function searchPosts(query: string) {
  const embedding = await getEmbedding(query);
  console.log('Generated embedding for query:', query);

  await milvusClient.loadCollection({
    collection_name: COLLECTION_NAME
  });

  const searchResponse = await milvusClient.search({
    collection_name: COLLECTION_NAME,
    vectors: [embedding],
    output_fields: ['content', 'author', 'username', 'image', 'likes', 'retweets', 'comments'],
    search_params: { anns_field: "embedding", topk: 20, metric_type: "L2", params: JSON.stringify({ nprobe: 10 }) },
    limit: 20
  });

  console.log('Search response:', searchResponse);

  if (!searchResponse.results || !Array.isArray(searchResponse.results)) {
    console.log('No results found or results are not in expected format');
    return [];
  }

  const results = searchResponse.results.map((result: any, index: number) => ({
    id: `milvus-${index}`,
    content: result.content || '',
    author: result.author || '',
    username: result.username || '',
    image: result.image || '',
    likes: Number(result.likes) || 0,
    retweets: Number(result.retweets) || 0,
    comments: Number(result.comments) || 0,
    score: result.score,
    similarity: (1 - (result.score || 0)) * 100
  }));

  results.sort((a, b) => b.similarity - a.similarity);
  console.log('Search results:', results);

  return results;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Invalid query parameter' }, { status: 400 });
  }

  try {
    const results = await searchPosts(query);
    return NextResponse.json(results);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 