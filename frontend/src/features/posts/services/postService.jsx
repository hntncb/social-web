import api from '@/shared/services/api';

export const getPost = async ({ limit, offset }) => {
  const list = await api.get(`/v1/posts/pages?limit=${limit}&offset=${offset}`);
  return list;
};

export const createPost = async (params) => {
  const response = await api.post(`/v1/posts`, params);
  return response;
};

export const getPostContent = async (id) => {
  const response = await api.get(`/v1/posts/${id}`);
  return response;
};

export const editPostContent = async (data) => {
  const response = await api.patch(`/v1/posts/${data.id}`, data.updateData);
  return response;
};
