import React from 'react';
import * as S from './RegisterForm.style';
import { useForm, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

const TextContent = {
  id: '아이디',
  password: '비밀번호',
  confirmPassword: '비밀번호 확인',
  username: '닉네임',
  registerTitleText: '회원가입',
  registerButtonText: '회원가입',
  helpTextIdRequired: '아이디를 입력하세요',
  helpTextPasswordRequired: '비밀번호를 입력하세요',
  helpTextConfirmPassword: '비밀번호가 일치하지 않아요',
  helpTextUsernameRequired: '닉네임을 입력하세요',
  helpTextUsernameLength: '닉네임은 2자 이상 12자 이하여야 해요',
};

const schema = yup.object().shape({
  id: yup.string().required(TextContent.helpTextIdRequired),
  password: yup.string().required(TextContent.helpTextPasswordRequired),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], TextContent.helpTextConfirmPassword),
  username: yup
    .string()
    .required(TextContent.helpTextUsernameRequired)
    .min(2, TextContent.helpTextUsernameLength)
    .max(12, TextContent.helpTextUsernameLength),
});

const HOST = 'http://localhost:8000';

const httpPost = async (url: string, payload: FieldValues) => {
  const response = await fetch(url, {
    method: 'POST',
    // credentials: 'include',
    // headers: {
    //   'Content-Type': 'application/json',
    // }
    body: JSON.stringify(payload),
  });
  return response;
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const registerSubmit = async (body: FieldValues) => {
    delete body.confirmPassword;

    console.log(body);
    try {
      const response = await httpPost(HOST, body);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log('응답이 없어요.');
    }
  };

  return (
    <S.RegisterFormContainer>
      <S.RegisterTitle>{TextContent.registerTitleText}</S.RegisterTitle>
      <S.RegisterForm onSubmit={handleSubmit(registerSubmit)}>
        <S.Field>
          <label>{TextContent.id}</label>
          <input {...register('id')} />
          <S.HelpText>
            {errors.id ? errors.id.message?.toString() : ''}
          </S.HelpText>
        </S.Field>
        <S.Field>
          <label>{TextContent.password}</label>
          <input type="password" {...register('password')} />
          <S.HelpText>
            {errors.password ? errors.password.message?.toString() : ''}
          </S.HelpText>
        </S.Field>
        <S.Field>
          <label>{TextContent.confirmPassword}</label>
          <input type="password" {...register('confirmPassword')} />
          <S.HelpText>
            {errors.confirmPassword
              ? errors.confirmPassword.message?.toString()
              : ''}
          </S.HelpText>
        </S.Field>
        <S.Field>
          <label>{TextContent.username}</label>
          <input {...register('username')} />
          <S.HelpText>
            {errors.username ? errors.username.message?.toString() : ''}
          </S.HelpText>
        </S.Field>
        <S.RegisterButton>{TextContent.registerButtonText}</S.RegisterButton>
      </S.RegisterForm>
    </S.RegisterFormContainer>
  );
};
