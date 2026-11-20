import { useState } from 'react';
import { getPost } from '../services/postService';

export const useGetPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetPost = async (params) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getPost(params);

      return response.data;
    } catch (error) {
      setError(error.response || 'Lấy bài viết thất bại');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    handleGetPost,
    loading,
    error,
  };
};
