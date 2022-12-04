import { FieldValues } from 'react-hook-form';

export const httpGet = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

export const httpPost = async (url: string, payload: FieldValues) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return response;
};
