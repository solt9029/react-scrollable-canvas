import styled from 'styled-components';

export interface CanvasProps {
  top?: number;
  left?: number;
  translateX?: number;
  translateY?: number;
}

export const Canvas = styled.canvas<CanvasProps>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  outline: none;
  transform: translate(${props => `${props.translateX}px, ${props.translateY}px`});
  overflow: hidden;
`;

Canvas.defaultProps = {
  top: 0,
  left: 0,
  translateX: 0,
  translateY: 0,
};
