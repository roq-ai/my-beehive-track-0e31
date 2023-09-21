import axios from 'axios';
import queryString from 'query-string';
import { HealthCheckInterface, HealthCheckGetQueryInterface } from 'interfaces/health-check';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHealthChecks = async (
  query?: HealthCheckGetQueryInterface,
): Promise<PaginatedInterface<HealthCheckInterface>> => {
  const response = await axios.get('/api/health-checks', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHealthCheck = async (healthCheck: HealthCheckInterface) => {
  const response = await axios.post('/api/health-checks', healthCheck);
  return response.data;
};

export const updateHealthCheckById = async (id: string, healthCheck: HealthCheckInterface) => {
  const response = await axios.put(`/api/health-checks/${id}`, healthCheck);
  return response.data;
};

export const getHealthCheckById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/health-checks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHealthCheckById = async (id: string) => {
  const response = await axios.delete(`/api/health-checks/${id}`);
  return response.data;
};
