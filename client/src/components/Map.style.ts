import styled from 'styled-components';

const MAP_ICON_SIZE = '20rem';
export const MapIcon = styled.img`
  width: ${MAP_ICON_SIZE};
  height: ${MAP_ICON_SIZE};
  border-radius: 20rem;
`;

export const MapList = styled.div`
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Map = styled.div`
  background-color: #eeeeee;
  padding: 2rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;
