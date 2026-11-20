import { useState } from 'react';
import { login } from '../services/authService';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await login(data.username, data.password);

      return response;
    } catch (err) {
      setError(err.response || 'Đăng nhập thất bại');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    error,
  };
};
