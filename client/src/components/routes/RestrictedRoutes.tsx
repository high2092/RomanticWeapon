import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthorization } from '../../hooks/useAuthorization';

export const RestrictedRoutes = () => {
  const hasLogin = useAuthorization();

  if (hasLogin === undefined) return <></>;
  return !hasLogin ? <Outlet /> : <Navigate to="/" />;
};
