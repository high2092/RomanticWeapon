import React from 'react';
import * as S from './RegisterForm.style';

const TextContent = {
  id: '아이디',
  password: '비밀번호',
  confirmPassword: '비밀번호 확인',
  username: '닉네임',
  registerTitleText: '회원가입',
  registerButtonText: '회원가입',
};

export const RegisterForm = () => {
  return (
    <S.RegisterFormContainer>
      <S.RegisterTitle>{TextContent.registerTitleText}</S.RegisterTitle>
      <S.RegisterForm>
        <S.Field>
          <label>{TextContent.id}</label>
          <input />
        </S.Field>
        <S.Field>
          <label>{TextContent.password}</label>
          <input type="password" />
        </S.Field>
        <S.Field>
          <label>{TextContent.confirmPassword}</label>
          <input type="password" />
        </S.Field>
        <S.Field>
          <label>{TextContent.username}</label>
          <input />
        </S.Field>
        <S.RegisterButton>{TextContent.registerButtonText}</S.RegisterButton>
      </S.RegisterForm>
    </S.RegisterFormContainer>
  );
};
