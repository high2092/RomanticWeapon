import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './LoginForm.style';
import { bgm, HOST } from '../constants/constants';
import { httpPost } from '../utils/utils';
import { useForm, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const TextContent = {
  id: '아이디',
  password: '비밀번호',
  confirmPassword: '비밀번호 확인',
  username: '닉네임',
  helpTextIdRequired: '아이디를 입력하세요',
  helpTextPasswordRequired: '비밀번호를 입력하세요',
};

const schema = yup.object().shape({
  id: yup.string().required(TextContent.helpTextIdRequired),
  password: yup.string().required(TextContent.helpTextPasswordRequired),
});

const LoginForm = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const loginSubmit = async (body: FieldValues) => {
    const response = await httpPost(`${HOST}/login`, body);
    if (response.status === 200) {
      bgm.play();
      navigate('/');
    }
  };

  return (
    <S.LoginForm onSubmit={handleSubmit(loginSubmit)}>
      <S.Logo>로맨틱 웨폰</S.Logo>
      <input {...register('id')}/>
      <input {...register('password')}/>
      <button>로그인</button>
    </S.LoginForm>
  );
};

export default LoginForm;
