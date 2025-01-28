import { milvusClient, COLLECTION_NAME } from '../utils/milvus/client';

async function testMilvusSetup() {
  try {
    // Check if collection exists
    const exists = await milvusClient.hasCollection({
      collection_name: COLLECTION_NAME
    });
    console.log('Collection exists:', exists);

    if (exists) {
      // Load collection
      await milvusClient.loadCollection({
        collection_name: COLLECTION_NAME
      });
      console.log('Collection loaded successfully');

      // Get collection stats
      const stats = await milvusClient.getCollectionStatistics({
        collection_name: COLLECTION_NAME
      });
      console.log('Collection stats:', stats);

      // Describe collection to verify schema
      const description = await milvusClient.describeCollection({
        collection_name: COLLECTION_NAME
      });
      console.log('Collection description:', description);

      // Perform a test search with proper parameters
      const testVector = new Array(1536).fill(0.1);
      const searchResults = await milvusClient.search({
        collection_name: COLLECTION_NAME,
        vectors: [testVector],
        output_fields: ['content', 'author', 'username', 'image'],
        search_params: {
          anns_field: "embedding",
          topk: 5,
          metric_type: "L2",
          params: JSON.stringify({ nprobe: 10 })
        }
      });

      console.log('Search results:', JSON.stringify(searchResults, null, 2));
    } else {
      console.log('Collection does not exist. Please run init-milvus.ts first.');
    }
  } catch (error) {
    console.error('Error testing Milvus setup:', error);
  } finally {
    // Release collection
    try {
      await milvusClient.releaseCollection({
        collection_name: COLLECTION_NAME
      });
      console.log('Collection released');
    } catch (releaseError) {
      console.error('Error releasing collection:', releaseError);
    }
  }
}

testMilvusSetup().catch(console.error); 