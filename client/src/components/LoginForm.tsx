import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './LoginForm.style';
import { bgm } from '../constants/constants';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    const loginSuccess = true;
    if (loginSuccess) {
      bgm.play();
      navigate('/');
    }
  };

  return (
    <S.LoginForm>
      <S.Logo>로맨틱 웨폰</S.Logo>
      <button onClick={handleLoginButtonClick}>Github 로그인</button>
    </S.LoginForm>
  );
};

export default LoginForm;
