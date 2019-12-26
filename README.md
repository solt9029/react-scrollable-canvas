# react-scrollable-canvas

[![Build Status](https://travis-ci.com/solt9029/react-scrollable-canvas.svg?branch=master)](https://travis-ci.com/solt9029/react-scrollable-canvas)

react-scrollable-canvas is a React component library that allows you to create scrollable canvas easily and quickly.

## Installation

Install ``` react-scrollable-canvas ``` with npm:

```
npm install react-scrollable-canvas --save
```

## Example

![demo](https://github.com/solt9029/react-scrollable-canvas/blob/master/demo.gif)

```js
import React, { Component, createRef } from 'react';
import { ScrollableCanvas } from './react-scrollable-canvas';

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
        this.ctx.fillStyle = `rgba(${(scrollLeft + x) / 2}, ${(scrollTop + y) / 2}, 128, 0.8)`;
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

```

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
