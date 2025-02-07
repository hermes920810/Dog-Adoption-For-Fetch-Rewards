import axios from 'axios';
import { DogSearchResponse, SearchParams, DogModel } from '../types';

const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true, // Important for handling auth cookies
});

// Generic API handler
const handleRequest = async <T>(request: Promise<any>): Promise<T> => {
  const { data } = await request;
  return data;
};

// Authentication APIs
export const login = (name: string, email: string) => handleRequest(api.post('/auth/login', { name, email }));
export const logout = () => handleRequest(api.post('/auth/logout'));

// Dog APIs
export const fetchBreeds = () => handleRequest<string[]>(api.get('/dogs/breeds'));

// Search Function
export const searchDogs = (params?: SearchParams, nextPageUrl?: string) => {
  if (nextPageUrl) {
    return handleRequest<DogSearchResponse>(api.get(nextPageUrl)); // Fetch using pagination URL
  }
  return handleRequest<DogSearchResponse>(api.get('/dogs/search', { params })); // Initial search
};

export const fetchDogsByIds = (ids: string[]) => handleRequest<DogModel[]>(api.post('/dogs', ids));
export const getDogMatch = (dogIds: string[]) => handleRequest<{ match: string }>(api.post('/dogs/match', dogIds));

export default api;
