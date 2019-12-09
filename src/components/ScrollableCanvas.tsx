import React, { useState, RefObject } from 'react';
import Canvas from './Canvas';
import ScrollableCanvasContainer from './ScrollableCanvasContainer';

export interface ScrollableCanvasProps {
  width: number;
  height: number;
  largeWidth: number;
  largeHeight: number;
  wait: number;
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
  canvasRef?: RefObject<HTMLCanvasElement>;
}

const ScrollableCanvas = (props: ScrollableCanvasProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onScroll = (scrollTop: number, scrollLeft: number) => {
    setScrollTop(scrollTop);
    setScrollLeft(scrollLeft);

    if (props.onScroll === undefined) {
      return;
    }
    props.onScroll(scrollTop, scrollLeft);
  };

  return (
    <ScrollableCanvasContainer
      onScroll={onScroll}
      wait={props.wait}
      width={props.width}
      height={props.height}
      largeWidth={props.largeWidth}
      largeHeight={props.largeHeight}
    >
      <Canvas
        ref={props.canvasRef}
        width={props.width}
        height={props.height}
        translateX={scrollLeft}
        translateY={scrollTop}
      ></Canvas>
    </ScrollableCanvasContainer>
  );
};

ScrollableCanvas.defaultProps = {
  wait: 10,
};

export default ScrollableCanvas;
