import React, { Component, createRef } from 'react';
import { ScrollableCanvas } from './react-scrollable-canvas';
import styled from 'styled-components';

const WIDTH = 300;
const HEIGHT = 300;
const LARGE_WIDTH = 600;
const LARGE_HEIGHT = 600;
const CIRCLE_RADIUS = 10;

const Div = styled.div`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  border: inset 1px #000000;
`;

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
      this.ctx.fillStyle = `rgba(0, 0, 0, 0.8)`;
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
