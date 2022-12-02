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
