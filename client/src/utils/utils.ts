import { FieldValues } from 'react-hook-form';

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
