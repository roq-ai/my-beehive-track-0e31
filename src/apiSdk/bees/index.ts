import axios from 'axios';
import queryString from 'query-string';
import { BeeInterface, BeeGetQueryInterface } from 'interfaces/bee';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBees = async (query?: BeeGetQueryInterface): Promise<PaginatedInterface<BeeInterface>> => {
  const response = await axios.get('/api/bees', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBee = async (bee: BeeInterface) => {
  const response = await axios.post('/api/bees', bee);
  return response.data;
};

export const updateBeeById = async (id: string, bee: BeeInterface) => {
  const response = await axios.put(`/api/bees/${id}`, bee);
  return response.data;
};

export const getBeeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/bees/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBeeById = async (id: string) => {
  const response = await axios.delete(`/api/bees/${id}`);
  return response.data;
};
