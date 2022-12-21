import styled, { keyframes } from 'styled-components';

export const Forge = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  width: 60rem;
  height: 30rem;
  /* justify-content: space-between; */
  align-items: center;
  white-space: nowrap;

  @media screen and (max-width: 500px) {
    flex-direction: column;
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
  margin: auto;
  border: 1px solid black;

  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 10rem;
  }
`;

export const LogsContainer = styled.div`
  width: 21rem;
  /* background-color: red; */
  flex: 2;
`;

export const RefineAnimation = styled.img`
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

  @media screen and (max-width: 500px) {
    width: 4rem;
    height: 4rem;
  }
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

export const RefineResultAnimation = styled.img`
  position: absolute;
  top: -30%;
  left: 68.5%;
  width: 14rem;

  @media screen and (max-width: 500px) {
    top: -43%;
    left: 20.5%;
  }
`;

export const RefineSuccessAnimation = styled.img`
  position: absolute;
  top: -47%;
  left: 64%;
  width: 21rem;

  @media screen and (max-width: 500px) {
    top: -60%;
    left: 10%;
  }
`;
