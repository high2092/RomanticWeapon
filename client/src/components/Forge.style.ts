import styled, { keyframes } from 'styled-components';

export const Forge = styled.div`
  display: flex;
  width: 60rem;
  height: 30rem;
  /* justify-content: space-between; */
  align-items: center;
  white-space: nowrap;
  * {
    margin: 0 1rem;
  }
`;

export const Level = styled.div`
  &::before {
    content: '+';
  }
`;

export const Logs = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 30rem;
  overflow-y: scroll;
  border-radius: 20px;
  padding: 0.5rem;
  border: 1px solid black;
`;

export const LogsContainer = styled.div`
  width: 20rem;
  flex: 2;
`;

export const Dimmed = styled.div<{ zIndex: number }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: ${(props) => props.zIndex};
`;

export const RefineAnimation = styled.img<{ zIndex: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${(props) => props.zIndex};

  width: 10rem;
  height: 10rem;
`;

export const RefineButtonSection = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
`;

export const RefineButton = styled.button`
  padding: 1rem 1.3rem;
  border-radius: 10px;
  font-size: 1rem;
  border: none;
  &:hover {
    background-color: #bbbbbb;
  }
`;

export const WeaponSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WEAPON_IMAGE_SIZE = '7rem';
export const WeaponImage = styled.img`
  width: ${WEAPON_IMAGE_SIZE};
  height: ${WEAPON_IMAGE_SIZE};
  padding: 2rem;
  /* border: 1px solid #dddddd; */
  margin: 1rem;
`;

export const SizedText = styled.div<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
`;

const fadein = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }
  20% {
    opacity: 1;
  }
  35% {
    opacity: 1;
    transform: translateZ(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

export const Test = styled.div<{ fontSize: number }>`
  transform: translateX(-20rem);
  font-size: ${(props) => props.fontSize / 5}rem;
  transition: all 1s;
  animation: ${fadein} 1s;
`;

export const Achivement = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 4rem;
  animation: ${fadein} 2.1s;
`;
