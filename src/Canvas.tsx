import styled from 'styled-components';

export interface CanvasProps {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  translateX?: number;
  translateY?: number;
}

const Canvas = styled.canvas.attrs((props: CanvasProps) => ({
  style: {
    top: `${props.top}px`,
    left: `${props.left}px`,
    width: `${props.width}px`,
    height: `${props.height}px`,
    transform: `translate(${props.translateX}px, ${props.translateY}px)`,
  },
}))<CanvasProps>`
  position: absolute;
  outline: none;
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
