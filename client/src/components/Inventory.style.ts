import styled from 'styled-components';

export const Inventory = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(7, 1fr);

  width: 70%;
  height: 70%;
  background-color: aliceblue;
`;

export const Item = styled.div`
  background-color: antiquewhite;
  margin: 2rem;
`;
