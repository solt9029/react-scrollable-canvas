import React, { Component, createRef } from 'react';
import { ScrollableCanvasContainer, Canvas } from './react-scrollable-canvas';

const WIDTH = 300;
const HEIGHT = 300;
const LARGE_WIDTH = 600;
const LARGE_HEIGHT = 600;
const CIRCLE_RADIUS = 5;
const CIRCLE_SIZE = 30;

export default class ScrollableCanvasContainerExample extends Component {
  frontCanvasRef = createRef();
  backCanvasRef = createRef();
  frontCtx = null;
  backCtx = null;

  state = {
    scrollTop: 0,
    scrollLeft: 0,
  };

  draw = () => {
    const { scrollTop, scrollLeft } = this.state;

    // draw canvas here.
    if (this.frontCtx !== null) {
      this.frontCtx.clearRect(0, 0, WIDTH, HEIGHT);
      for (let y = -scrollTop % CIRCLE_SIZE; y < HEIGHT - (scrollTop % CIRCLE_SIZE); y += CIRCLE_SIZE) {
        for (let x = -scrollLeft % CIRCLE_SIZE; x < WIDTH - (scrollLeft % CIRCLE_SIZE); x += CIRCLE_SIZE) {
          this.frontCtx.beginPath();
          this.frontCtx.arc(x + CIRCLE_SIZE / 2, y + CIRCLE_SIZE / 2, CIRCLE_RADIUS, 0, 360, false);
          this.frontCtx.fillStyle = `rgba(${(scrollLeft + x) / 2}, ${(scrollTop + y) / 2}, 128, 0.8)`;
          this.frontCtx.fill();
        }
      }
    }
    if (this.backCtx !== null) {
      this.backCtx.clearRect(0, 0, WIDTH, HEIGHT);
      this.backCtx.beginPath();
      const gradient = this.backCtx.createLinearGradient(-scrollLeft, -scrollTop, LARGE_WIDTH, LARGE_HEIGHT);
      gradient.addColorStop(0.0, 'rgb(255, 0, 0)');
      gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
      gradient.addColorStop(1.0, 'rgb(0, 0, 255)');
      this.backCtx.fillStyle = gradient;
      this.backCtx.rect(-scrollLeft, -scrollTop, LARGE_WIDTH, LARGE_HEIGHT);
      this.backCtx.fill();
    }
  };

  onScroll = (scrollTop, scrollLeft) => {
    this.setState({ scrollTop, scrollLeft });
  };

  componentDidUpdate() {
    this.draw();
  }

  componentDidMount() {
    if (this.frontCanvasRef.current !== null) {
      this.frontCtx = this.frontCanvasRef.current.getContext('2d');
    }
    if (this.backCanvasRef.current !== null) {
      this.backCtx = this.backCanvasRef.current.getContext('2d');
    }
    this.draw();
  }

  render() {
    const { scrollTop, scrollLeft } = this.state;

    return (
      <>
        <ScrollableCanvasContainer
          width={WIDTH}
          height={HEIGHT}
          largeWidth={LARGE_WIDTH}
          largeHeight={LARGE_HEIGHT}
          onScroll={this.onScroll}
        >
          <Canvas
            ref={this.backCanvasRef}
            width={WIDTH}
            height={HEIGHT}
            translateX={scrollLeft}
            translateY={scrollTop}
          />
          <Canvas
            ref={this.frontCanvasRef}
            width={WIDTH}
            height={HEIGHT}
            translateX={scrollLeft}
            translateY={scrollTop}
          />
        </ScrollableCanvasContainer>
      </>
    );
  }
}
