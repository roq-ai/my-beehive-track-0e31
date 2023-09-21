import axios from 'axios';
import queryString from 'query-string';
import { HarvestInterface, HarvestGetQueryInterface } from 'interfaces/harvest';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHarvests = async (query?: HarvestGetQueryInterface): Promise<PaginatedInterface<HarvestInterface>> => {
  const response = await axios.get('/api/harvests', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHarvest = async (harvest: HarvestInterface) => {
  const response = await axios.post('/api/harvests', harvest);
  return response.data;
};

export const updateHarvestById = async (id: string, harvest: HarvestInterface) => {
  const response = await axios.put(`/api/harvests/${id}`, harvest);
  return response.data;
};

export const getHarvestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/harvests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHarvestById = async (id: string) => {
  const response = await axios.delete(`/api/harvests/${id}`);
  return response.data;
};
