import styled from 'styled-components';
import map00ImgUrl from '../assets/map00.png';
import map01ImgUrl from '../assets/map01.png';

const mapImageUrls = [map00ImgUrl, map01ImgUrl];
export const DungeonPage = styled.div<{ idx: number }>`
  width: 100vw;
  height: 100vh;
  background-image: ${(props) => `url(${mapImageUrls[props.idx]})`};
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;
