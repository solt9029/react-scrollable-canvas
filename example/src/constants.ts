export const scrollableCanvasExampleCode = `import React, { Component, createRef } from 'react';
import { ScrollableCanvas } from './react-scrollable-canvas';

const WIDTH = 300;
const HEIGHT = 300;
const LARGE_WIDTH = 600;
const LARGE_HEIGHT = 600;
const CIRCLE_RADIUS = 5;
const CIRCLE_SIZE = 30;

export default class ScrollableCanvasExample extends Component {
  private canvasRef = createRef<HTMLCanvasElement>();
  private ctx: CanvasRenderingContext2D | null = null;

  private draw = (scrollTop: number, scrollLeft: number) => {
    if (this.ctx === null) {
      return;
    }

    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for (let y = -scrollTop % CIRCLE_SIZE; y < HEIGHT - (scrollTop % CIRCLE_SIZE); y += CIRCLE_SIZE) {
      for (let x = -scrollLeft % CIRCLE_SIZE; x < WIDTH - (scrollLeft % CIRCLE_SIZE); x += CIRCLE_SIZE) {
        this.ctx.beginPath();
        this.ctx.arc(x + CIRCLE_SIZE / 2, y + CIRCLE_SIZE / 2, CIRCLE_RADIUS, 0, 360, false);
        this.ctx.fillStyle = \`rgba(\${(scrollLeft + x) / 2}, \${(scrollTop + y) / 2}, 128, 0.8)\`;
        this.ctx.fill();
      }
    }
  };

  componentDidMount() {
    if (this.canvasRef.current !== null) {
      this.ctx = this.canvasRef.current.getContext('2d');
      this.draw(0, 0);
    }
  }

  render() {
    return (
      <ScrollableCanvas
        width={WIDTH}
        height={HEIGHT}
        largeWidth={LARGE_WIDTH}
        largeHeight={LARGE_HEIGHT}
        canvasRef={this.canvasRef}
        onScroll={this.draw}
      />
    );
  }
}
`;

export const scrollableCanvasContainerExampleCode = `import React, { Component, createRef } from 'react';
import { ScrollableCanvasContainer, Canvas } from './react-scrollable-canvas';

const WIDTH = 300;
const HEIGHT = 300;
const LARGE_WIDTH = 600;
const LARGE_HEIGHT = 600;
const CIRCLE_RADIUS = 5;
const CIRCLE_SIZE = 30;

interface ScrollableCanvasContainerExampleState {
  scrollTop: number;
  scrollLeft: number;
}

export default class ScrollableCanvasContainerExample extends Component<{}, ScrollableCanvasContainerExampleState> {
  private frontCanvasRef = createRef<HTMLCanvasElement>();
  private backCanvasRef = createRef<HTMLCanvasElement>();
  private frontCtx: CanvasRenderingContext2D | null = null;
  private backCtx: CanvasRenderingContext2D | null = null;

  state = {
    scrollTop: 0,
    scrollLeft: 0,
  };

  private draw = () => {
    const { scrollTop, scrollLeft } = this.state;

    if (this.frontCtx !== null) {
      this.frontCtx.clearRect(0, 0, WIDTH, HEIGHT);
      for (let y = -scrollTop % CIRCLE_SIZE; y < HEIGHT - (scrollTop % CIRCLE_SIZE); y += CIRCLE_SIZE) {
        for (let x = -scrollLeft % CIRCLE_SIZE; x < WIDTH - (scrollLeft % CIRCLE_SIZE); x += CIRCLE_SIZE) {
          this.frontCtx.beginPath();
          this.frontCtx.arc(x + CIRCLE_SIZE / 2, y + CIRCLE_SIZE / 2, CIRCLE_RADIUS, 0, 360, false);
          this.frontCtx.fillStyle = \`rgba(\${(scrollLeft + x) / 2}, \${(scrollTop + y) / 2}, 128, 0.8)\`;
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

  private onScroll = (scrollTop: number, scrollLeft: number) => {
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
`;

export const scrollableCanvasWithMeasureExampleCode = `import React, { Component, createRef } from 'react';
import { ScrollableCanvas } from './react-scrollable-canvas';
import Measure from 'react-measure';
import styled from 'styled-components';

const CIRCLE_RADIUS = 5;
const CIRCLE_SIZE = 30;

const Div = styled.div\`
  width: 100%;
  height: 300px;
\`;

export default class ScrollableCanvasWithMeasureExample extends Component<{}, {}> {
  private canvasRef = createRef<HTMLCanvasElement>();
  private ctx: CanvasRenderingContext2D | null = null;

  state = {
    canvas: { width: 0, height: 0 },
    scroll: { top: 0, left: 0 },
  };

  private draw = () => {
    if (this.ctx === null) {
      return;
    }

    const { width, height } = this.state.canvas;
    const { top, left } = this.state.scroll;

    this.ctx.clearRect(0, 0, width, height);
    for (let y = -top % CIRCLE_SIZE; y < height - (top % CIRCLE_SIZE); y += CIRCLE_SIZE) {
      for (let x = -left % CIRCLE_SIZE; x < width - (left % CIRCLE_SIZE); x += CIRCLE_SIZE) {
        this.ctx.beginPath();
        this.ctx.arc(x + CIRCLE_SIZE / 2, y + CIRCLE_SIZE / 2, CIRCLE_RADIUS, 0, 360, false);
        this.ctx.fillStyle = \`rgba(\${(left + x) / 2}, \${(top + y) / 2}, 128, 0.8)\`;
        this.ctx.fill();
      }
    }
  };

  private onScroll = (scrollTop: number, scrollLeft: number) => {
    this.setState({ scroll: { top: scrollTop, left: scrollLeft } });
  };

  componentDidMount() {
    if (this.canvasRef.current !== null) {
      this.ctx = this.canvasRef.current.getContext('2d');
    }
  }

  componentDidUpdate() {
    this.draw();
  }

  render() {
    const { width, height } = this.state.canvas;

    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ canvas: { ...contentRect.bounds } });
        }}
      >
        {({ measureRef }) => (
          <Div ref={measureRef}>
            <ScrollableCanvas
              width={width}
              height={height}
              largeWidth={width * 2}
              largeHeight={height * 2}
              canvasRef={this.canvasRef}
              onScroll={this.onScroll}
            />
          </Div>
        )}
      </Measure>
    );
  }
}
`;
