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

export const Mob = styled.div``;

export const Bar = styled.div`
  position: fixed;

  display: flex;
  align-items: center;
  bottom: 6rem;
  width: 32rem;
  height: 2rem;

  background-color: #ffc457;

  border-radius: 1rem;
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
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  animation: ${fall} 1s;
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
`;

const REINFORCEMENT_CARD_ICON_SIZE = '8rem';
export const ReinforcementCardIcon = styled.img`
  width: ${REINFORCEMENT_CARD_ICON_SIZE};
  height: ${REINFORCEMENT_CARD_ICON_SIZE};

  margin: 2rem;
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
