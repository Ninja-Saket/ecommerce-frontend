import axios from 'axios';

/**
 * Sync all product embeddings to ChromaDB
 */
export const syncProductEmbeddings = async (authtoken) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/product/sync-embeddings`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
  return result;
};
