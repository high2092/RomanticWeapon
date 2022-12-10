import styled from 'styled-components';

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
  transition: 0.5s all;
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
