import { useEffect, useState } from 'react';
import { HOST } from '../constants/constants';
import { httpGet } from '../utils/utils';

export const useAuthorization = () => {
  const [hasLogin, setHasLogin] = useState<boolean>();

  const httpGetCheckLogin = async () => {
    const response = await httpGet(`${HOST}/auth/check-login`);
    return response.status === 200;
  };

  useEffect(() => {
    httpGetCheckLogin().then((hasLogin) => {
      setHasLogin(hasLogin);
    });
  }, []);
  return hasLogin;
};
