import React from 'react';
import { RegisterForm } from '../components/RegisterForm';
import * as S from './RegisterPage.style';

export const RegisterPage = () => {
  return (
    <S.RegisterPage>
      <S.Logo>로맨틱웨폰</S.Logo>
      <RegisterForm />
    </S.RegisterPage>
  );
};
