import { editPostContent } from '../services/postService';
import { useState } from 'react';

export const useEditPostContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditPostContent = async (params) => {
    try {
      setLoading(true);
      setError(null);

      const response = await editPostContent(params);

      return response.data;
    } catch (error) {
      setError(error.response || 'Tạo bài viết thất bại');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    handleEditPostContent,
    loading,
    error,
  };
};
