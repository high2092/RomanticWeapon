import styled from 'styled-components';

export const Shop = styled.div`
  display: flex;
  width: 70%;
  height: 70%;

  border-radius: 2rem;
`;

export const Tab = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  background-color: gray;
`;

export const TabMenu = styled.div`
  flex: 1;

  background-color: tomato;
  font-size: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Showcase = styled.div`
  flex: 9;

  background-color: aliceblue;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(7, 1fr);

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Item = styled.div`
  display: flex;

  width: 5rem;
  height: 5rem;
  margin: 2rem;
  background-color: antiquewhite;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
