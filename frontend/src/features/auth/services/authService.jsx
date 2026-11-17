import api from '../../../shared/services/api';

export const login = async(username, password) => {
  const response = await api.post('/v1/auth/login', {username, password});
  return response;
}

export const register = async(username, password) => {
  const response = await api.post('/v1/auth/register', {username, password});
  return response;
}