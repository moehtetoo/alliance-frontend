import request from './base';

export const login = async (params) => {
  return await request.post(`${import.meta.env.VITE_HOST}auth/login`, params);
};

export const signUp = async (params) => {
  return await request.post(`${import.meta.env.VITE_HOST}auth/signup`, params);
};
