import axios from 'axios';
import Cookies from 'js-cookie';
import { UserGetMeRequest, UserloginRequest, UserSignupRequest } from '../interface/user';
const API_URL = import.meta.env.VITE__API_BASE_URL;


const api = axios.create({
  baseURL:API_URL, // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding the Authorization header to each request if the token exists
api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const loginRequest = async (values: UserloginRequest) => {
    const response = await api.post('/users/login', values);
    return response.data;
  };

export const signupRequest = async (values: UserSignupRequest) => {
    const response = await api.post('/users/signup', values);
    return response.data;
  };

export const getMeRequest = async ({token}: UserGetMeRequest) => {
    const response = await api.get('/users/me', {headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
  };


  
  export const uploadFileRequest = async ({ file, token, onUploadProgress }: {file: any, token: string, onUploadProgress: any}) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await axios.post(`${API_URL}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress,
    });
  
    return response.data;
  };


  
export const getFilesRequest = async ({token}: UserGetMeRequest) => {
    const response = await api.get('/files', {headers: {
        Authorization: `Bearer ${token}`
    }});
    return response.data;
  };

export default api;
