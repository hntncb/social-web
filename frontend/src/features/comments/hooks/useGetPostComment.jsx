import { getPostComment } from '@/features/comments/services/commentServices';
import { useState } from 'react';

export const useGetPostComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetPostComment = async (params) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getPostComment(params);

      return response.data;
    } catch (error) {
      setError(error.response || 'Tạo bài viết thất bại');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    handleGetPostComment,
    loading,
    error,
  };
};
