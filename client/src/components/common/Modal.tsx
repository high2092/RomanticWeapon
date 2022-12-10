import React from 'react';
import styled from 'styled-components';

interface DimmedProps {
  zIndex: number;
  handleDimmedClick: () => void;
}

interface ModalProps {
  element: JSX.Element;
  zIndex: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
  handleDimmedClick: () => void;
}

export const Modal = ({
  element,
  zIndex,
  handleDimmedClick,
  ...props
}: ModalProps) => {
  return (
    <>
      <Dimmed zIndex={zIndex - 1} handleDimmedClick={handleDimmedClick} />
      <ModalContent zIndex={zIndex} {...props}>
        {element}
      </ModalContent>
    </>
  );
};

const ModalContent = styled.div<{
  zIndex: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}>`
  position: fixed;
  z-index: ${(props) => props.zIndex};
  ${(props) => (props.top ? `top: ${props.top};` : '')}
  ${(props) => (props.bottom ? `bottom: ${props.bottom};` : '')}
    ${(props) => (props.left ? `left: ${props.left};` : '')}
    ${(props) => (props.right ? `right: ${props.right};` : '')}
    ${(props) => (props.transform ? `transform: ${props.transform};` : '')}
`;

const Dimmed = ({ zIndex, handleDimmedClick }: DimmedProps) => {
  return <SDimmed onClick={handleDimmedClick} zIndex={zIndex} />;
};

export const SDimmed = styled.div<{ zIndex: number }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: ${(props) => props.zIndex};
`;
