import styled, { keyframes } from 'styled-components';

const spread = keyframes`
  0% {
    opacity: 0;
    transform: scaleX(0);
  }
  20% {
    opacity: 1;
    transform: scaleX(0);
  }
  35% {
    opacity: 1;
    transform: scaleX(0);
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
`;

const fall = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  20% {
    opacity: 1;
  }
  35% {
    opacity: 1;
    transform: translateZ(0);
  }
  100% {
    opacity: 1;
  }
`;

export const Dungeon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Mob = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rem;
`;

export const Bar = styled.div`
  /* position: fixed; */

  display: flex;
  align-items: center;
  bottom: 6rem;
  width: 32rem;
  height: 2rem;

  background-color: #ffc457;

  border-radius: 1rem;

  @media screen and (max-width: 500px) {
    width: 20rem;
  }
`;

export const HitButton = styled.button`
  display: none;
  outline: none;
  border: none;
  margin-top: 2rem;
  border-radius: 2rem;
  padding: 0.5rem 1rem;

  &:active {
    background-color: grey;
    box-shadow: 0 0.2rem #666;
    transform: translateY(0.1rem);
  }

  @media screen and (max-width: 500px) {
    display: block;
  }
`;

export const Hit = styled.img<{ left: string }>`
  width: 3rem;
  height: 3rem;

  position: relative;

  left: ${(props) => props.left};
  transform: translate(-50%, 0);
`;

export const HitBox = styled.div<{ left: string }>`
  position: relative;
  align-self: center;

  width: 2rem;
  height: inherit;
  background-color: red;

  left: ${(props) => props.left};

  transform: translate(-50%, 0);
`;

export const ReinforcementCardSelectionUI = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  animation: ${fall} 1s;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

export const ReinforcementCard = styled.div`
  width: 16rem;
  height: 24rem;
  background-color: #eeeeee;
  margin: 1rem;
  border-radius: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${spread} 1s;

  @media screen and (max-width: 500px) {
    height: 15rem;
  }
`;

const REINFORCEMENT_CARD_ICON_SIZE = '8rem';
const REINFORCEMENT_CARD_ICON_SIZE_MOBILE = '5rem';
export const ReinforcementCardIcon = styled.img`
  width: ${REINFORCEMENT_CARD_ICON_SIZE};
  height: ${REINFORCEMENT_CARD_ICON_SIZE};

  margin: 2rem;

  @media screen and (max-width: 500px) {
    width: ${REINFORCEMENT_CARD_ICON_SIZE_MOBILE};
    height: ${REINFORCEMENT_CARD_ICON_SIZE_MOBILE};
  }
`;

export const ReinforcementCardTitle = styled.div`
  font-size: 1.5rem;
`;

export const ReinforcementCardDescription = styled.div`
  font-size: 1.1rem;
  word-wrap: break-word;
  margin: 2rem;
`;

export const KeyboardInput = styled.input`
  position: absolute;
  opacity: 0;
`;
