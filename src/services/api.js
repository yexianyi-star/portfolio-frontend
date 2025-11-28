import axios from 'axios';
// 删除这行: import { useAuth } from '../context/AuthContext';

// 后端API的基础URL
const API_BASE_URL = 'http://159.75.172.68:5000';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器：自动添加JWT token
api.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理认证错误
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 未授权，清除本地存储并跳转到登录页
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 项目相关API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (projectData) => api.post('/projects', projectData),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`),
};

// 博客相关API
export const blogAPI = {
  getAll: () => api.get('/blog'),
  getById: (id) => api.get(`/blog/${id}`),
  create: (postData) => api.post('/blog', postData),
  update: (id, postData) => api.put(`/blog/${id}`, postData),
  delete: (id) => api.delete(`/blog/${id}`),
};

// 认证相关API
export const authAPI = {
  login: (credentials) => api.post('/users/login', credentials),
  register: (userData) => api.post('/users/register', userData),
};

// 联系表单API
export const contactAPI = {
  send: (messageData) => api.post('/contact', messageData),
};

export default api;