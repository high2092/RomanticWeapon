import styled from 'styled-components';

export const Forge = styled.div`
  display: flex;
  width: 30rem;
  height: 30rem;
  justify-content: space-between;
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
`;

export const LogsContainer = styled.div`
  width: 20rem;
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
