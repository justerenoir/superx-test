import { milvusClient, COLLECTION_NAME, DIMENSION } from '../utils/milvus/client';

async function initializeMilvusCollection() {
  try {
    // Check if collection exists
    const exists = await milvusClient.hasCollection({
      collection_name: COLLECTION_NAME
    });

    if (exists.value) {
      console.log('Collection already exists');
      return;
    }

    console.log('Creating collection...');
    // Create collection
    await milvusClient.createCollection({
      collection_name: COLLECTION_NAME,
      fields: [
        {
          name: 'id',
          description: 'ID field',
          data_type: 'Int64',
          is_primary_key: true,
          autoID: true
        },
        {
          name: 'content',
          description: 'Post content',
          data_type: 'VarChar',
          max_length: 2048
        },
        {
          name: 'author',
          description: 'Author name',
          data_type: 'VarChar',
          max_length: 100
        },
        {
          name: 'username',
          description: 'Author username',
          data_type: 'VarChar',
          max_length: 100
        },
        {
          name: 'image',
          description: 'Author image URL',
          data_type: 'VarChar',
          max_length: 255
        },
        {
          name: 'likes',
          description: 'Number of likes',
          data_type: 'Int64'
        },
        {
          name: 'retweets',
          description: 'Number of retweets',
          data_type: 'Int64'
        },
        {
          name: 'comments',
          description: 'Number of comments',
          data_type: 'Int64'
        },
        {
          name: 'embedding',
          description: 'Content embedding vector',
          data_type: 'FloatVector',
          dim: DIMENSION
        }
      ]
    });

    // Create index
    await milvusClient.createIndex({
      collection_name: COLLECTION_NAME,
      field_name: 'embedding',
      index_type: 'IVF_FLAT',
      metric_type: 'L2',
      params: { nlist: 1024 }
    });

    // Load the collection after creating index
    await milvusClient.loadCollection({
      collection_name: COLLECTION_NAME
    });

    console.log('Collection and index created successfully');
  } catch (error) {
    console.error('Error initializing Milvus:', error);
    throw error;
  }
}

initializeMilvusCollection().catch(console.error); 