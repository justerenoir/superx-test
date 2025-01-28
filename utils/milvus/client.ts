import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const MILVUS_ADDRESS = process.env.MILVUS_ADDRESS || 'localhost:19530';

export const milvusClient = new MilvusClient({
  address: MILVUS_ADDRESS,
  username: '',
  password: '',
  ssl: false
});

export const COLLECTION_NAME = 'posts';
export const DIMENSION = 1536; // For text-embedding-3-small model 