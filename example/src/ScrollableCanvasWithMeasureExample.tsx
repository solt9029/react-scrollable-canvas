import React, { Component, createRef } from 'react';
import { ScrollableCanvas } from './react-scrollable-canvas';
import Measure from 'react-measure';
import styled from 'styled-components';

const CIRCLE_RADIUS = 5;
const CIRCLE_SIZE = 30;

const Div = styled.div`
  width: 100%;
  height: 300px;
`;

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
        this.ctx.fillStyle = `rgba(${(left + x) / 2}, ${(top + y) / 2}, 128, 0.8)`;
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
