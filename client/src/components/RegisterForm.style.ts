import styled from 'styled-components';

export const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border: solid 1px grey;
  border-radius: 25px;

  margin: auto;
  margin-top: 4rem;

  width: max-content;
  height: max-content;
  padding: 1rem;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  jusitfy-content: center;
  width: max-content;
  height: max-content;
  padding: 2rem;
  padding-bottom: 0;
`;

export const Field = styled.div`
  display: flex;
  margin: 0.1rem;
  label {
    width: 6rem;
    margin: auto;
    margin-right: 0.5rem;
  }
  input {
    width: 7rem;
  }
`;

export const RegisterButton = styled.button`
  padding: 0.3rem;
  margin-top: 2rem;
`;

export const RegisterTitle = styled.div`
  font-size: 1.2rem;
  text-align: center;
`;
