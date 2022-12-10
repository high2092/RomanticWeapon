import styled from 'styled-components';

export const MainPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Menu = styled.div`
  position: fixed;
  bottom: 2rem;
  right: -2rem;

  width: 45rem;
  height: 5rem;
  background-color: #dddddd;
  border-radius: 3rem;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const LogoutButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
`;
