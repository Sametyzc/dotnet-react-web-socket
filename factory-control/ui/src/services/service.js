import { Fetch } from '../components/Fetch';
import { BaseConfig } from '../config/AppConfig';

export const RequestOptions = {
  get: () => ({
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }),
  post: data => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
};

export const FactoryService = {
  Update: data => Fetch(`${BaseConfig.apiUrl}/Factory/Update`, RequestOptions.post(data)),
};
