import styled from 'styled-components';
import { convertNumberToStringPx } from './utils';

export interface CanvasProps {
  top?: string | number;
  left?: string | number;
  width?: string | number;
  height?: string | number;
  translateX?: string | number;
  translateY?: string | number;
}

const Canvas = styled.canvas.attrs((props: CanvasProps) => ({
  style: {
    top: convertNumberToStringPx(props.top),
    left: convertNumberToStringPx(props.left),
    width: convertNumberToStringPx(props.width),
    height: convertNumberToStringPx(props.height),
    transform: `translate(
      ${convertNumberToStringPx(props.translateX)},
      ${convertNumberToStringPx(props.translateY)}
    )`,
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
