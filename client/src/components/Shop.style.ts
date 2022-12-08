import styled from 'styled-components';

export const Shop = styled.div`
  display: flex;
  width: 100rem;
  height: 45rem;

  border-radius: 2rem;
  overflow: hidden;
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

  * {
    margin: 2rem;
    display: flex;
    background-color: antiquewhite;
    justify-content: center;
    align-items: center;
  }
`;
