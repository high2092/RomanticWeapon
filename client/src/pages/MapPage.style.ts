import styled from 'styled-components';
import dungeonImgUrl from '../assets/dungeon.png';

export const MapPage = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url(${dungeonImgUrl});
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;
