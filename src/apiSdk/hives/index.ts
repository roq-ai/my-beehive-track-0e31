import axios from 'axios';
import queryString from 'query-string';
import { HiveInterface, HiveGetQueryInterface } from 'interfaces/hive';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHives = async (query?: HiveGetQueryInterface): Promise<PaginatedInterface<HiveInterface>> => {
  const response = await axios.get('/api/hives', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHive = async (hive: HiveInterface) => {
  const response = await axios.post('/api/hives', hive);
  return response.data;
};

export const updateHiveById = async (id: string, hive: HiveInterface) => {
  const response = await axios.put(`/api/hives/${id}`, hive);
  return response.data;
};

export const getHiveById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/hives/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHiveById = async (id: string) => {
  const response = await axios.delete(`/api/hives/${id}`);
  return response.data;
};
