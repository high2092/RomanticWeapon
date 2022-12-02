import { useEffect, useState } from 'react';

export const useAuthorization = () => {
  const [hasLogin, setHasLogin] = useState<boolean>();

  const httpGetCheckLogin = async () => {
    const hasLogin = await mockHttpGetCheckLogin();
    return hasLogin;
  };

  useEffect(() => {
    httpGetCheckLogin().then((hasLogin) => {
      setHasLogin(hasLogin);
    });
  }, []);
  return hasLogin;
};

const mockHttpGetCheckLogin = () => {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  });
};
