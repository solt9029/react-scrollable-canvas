import styled from 'styled-components';

export interface CanvasProps {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  translateX?: number;
  translateY?: number;
}

const Canvas = styled.canvas<CanvasProps>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  outline: none;
  transform: translate(${props => `${props.translateX}px, ${props.translateY}px`});
  overflow: hidden;
`;

Canvas.defaultProps = {
  top: 0,
  left: 0,
  width: 500,
  height: 500,
  translateX: 0,
  translateY: 0,
};

export default Canvas;
