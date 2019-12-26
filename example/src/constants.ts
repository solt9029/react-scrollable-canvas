export const scrollableCanvasExampleCode = `import React, { Component, createRef } from 'react';
import { ScrollableCanvas } from 'react-scrollable-canvas';

const WIDTH = 300;
const HEIGHT = 300;
const LARGE_WIDTH = 600;
const LARGE_HEIGHT = 600;
const CIRCLE_RADIUS = 5;
const CIRCLE_SIZE = 30;

export default class ScrollableCanvasExample extends Component {
  canvasRef = createRef();
  ctx = null;

  draw = (scrollTop, scrollLeft) => {
    // draw canvas here.
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
    this.ctx = this.canvasRef.current.getContext('2d');
    this.draw(0, 0);
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
import { ScrollableCanvasContainer, Canvas } from 'react-scrollable-canvas';

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

`;

export const scrollableCanvasWithMeasureExampleCode = `import React, { Component, createRef } from 'react';
import { ScrollableCanvas } from 'react-scrollable-canvas';
import Measure from 'react-measure';
import styled from 'styled-components';

const CIRCLE_RADIUS = 5;
const CIRCLE_SIZE = 30;

const Div = styled.div\`
  width: 100%;
  height: 300px;
\`;

export default class ScrollableCanvasWithMeasureExample extends Component {
  canvasRef = createRef();
  ctx = null;

  state = {
    canvas: { width: 0, height: 0 },
    scroll: { top: 0, left: 0 },
  };

  draw = () => {
    const { width, height } = this.state.canvas;
    const { top, left } = this.state.scroll;

    // draw canvas here.
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

  onScroll = (scrollTop, scrollLeft) => {
    this.setState({ scroll: { top: scrollTop, left: scrollLeft } });
  };

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
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

export const scrollableClickableCanvasExampleCode = `import React, { Component, createRef } from 'react';
import { ScrollableCanvas } from 'react-scrollable-canvas';
import styled from 'styled-components';

const WIDTH = 300;
const HEIGHT = 300;
const LARGE_WIDTH = 600;
const LARGE_HEIGHT = 600;
const CIRCLE_RADIUS = 10;

const Div = styled.div\`
  width: \${WIDTH}px;
  height: \${HEIGHT}px;
  border: inset 1px #000000;
\`;

export default class ScrollableClickableCanvasExample extends Component {
  canvasRef = createRef();
  ctx = null;
  points = [{ x: WIDTH / 2, y: HEIGHT / 2 }];
  state = {
    scrollTop: 0,
    scrollLeft: 0,
  };

  draw = () => {
    const { scrollTop, scrollLeft } = this.state;

    // draw canvas here.
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0; i < this.points.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(-scrollLeft + this.points[i].x, -scrollTop + this.points[i].y, CIRCLE_RADIUS, 0, 360, false);
      this.ctx.fillStyle = \`rgba(0, 0, 0, 0.8)\`;
      this.ctx.fill();
    }
  };

  onScroll = (scrollTop, scrollLeft) => {
    this.setState({ scrollTop, scrollLeft });
  };

  onClick = event => {
    const { offsetX, offsetY } = event.nativeEvent;
    const { scrollTop, scrollLeft } = this.state;
    this.points.push({ x: offsetX + scrollLeft, y: offsetY + scrollTop });
    this.draw();
  };

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  render() {
    return (
      <Div onClick={this.onClick}>
        <ScrollableCanvas
          width={WIDTH}
          height={HEIGHT}
          largeWidth={LARGE_WIDTH}
          largeHeight={LARGE_HEIGHT}
          canvasRef={this.canvasRef}
          onScroll={this.onScroll}
        />
      </Div>
    );
  }
}
`;

export const docsMarkdown = `# react-scrollable-canvas

[![Build Status](https://travis-ci.com/solt9029/react-scrollable-canvas.svg?branch=master)](https://travis-ci.com/solt9029/react-scrollable-canvas)

react-scrollable-canvas is a React component library that you can create scrollable canvas easily and quickly.

## Installation

Install \`\`\` react-scrollable-canvas \`\`\` with npm:

\`\`\`
npm install react-scrollable-canvas --save
\`\`\`

## Props

### ScrollableCanvas Props

|Name|Type|Description|
|---|---|---|
|width|number|Required. Width of the display size.|
|height|number|Required. Height of the display size.|
|largeWidth|number|Required. Width of the canvas size.|
|largeHeight|number|Required. Height of the canvas size.|
|wait|number|Function onScroll is called every (wait) milliseconds. Used for throttle function. Default value is 10.|
|noScrollbar|boolean|Hide scroll bar. Default value is false.|
|onScroll|(scrollTop: number, scrollLeft: number) => void|This function is called when scrolled.|
|canvasRef|React.RefObject|This references a canvas element inside ScrollableCanvas.|

### ScrollableCanvasContainer Props

|Name|Type|Description|
|---|---|---|
|width|number|Required. Width of the display size.|
|height|number|Required. Height of the display size.|
|largeWidth|number|Required. Width of the canvas size.|
|largeHeight|number|Required. Height of the canvas size.|
|wait|number|Function onScroll is called every (wait) milliseconds. Used for throttle function. Default value is 10.|
|noScrollbar|boolean|Hide scroll bar. Default value is false.|
|onScroll|(scrollTop: number, scrollLeft: number) => void|This function is called when scrolled.|
|children|React.ReactNode|Children of ScrollableCanvasContainer.|

### Canvas Props

|Name|Type|Description|
|---|---|---|
|width|number|Width css property. Default value is 500.|
|height|number|Height css property. Default value is 500.|
|translateX|number|translateX css property. Default value is 0.|
|translateY|number|translateY css property. Default value is 0.|
|top|number|top css property. Default value is 0.|
|left|number|left css property. Default value is 0.|

`;
