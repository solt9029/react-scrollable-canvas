import React, { Component, createRef } from 'react';
import { throttle } from 'lodash';
import { ScrollableCanvas } from './react-scrollable-canvas';

export default class ResizableCanvas extends Component<{}, { width: number }> {
  private canvasRef = createRef<HTMLCanvasElement>();
  private ctx: CanvasRenderingContext2D | null = null;
  private scrollTop = 0;
  private scrollLeft = 0;
  state = {
    width: 300,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.setState({ width: window.innerWidth });

    if (this.canvasRef.current === null) {
      return;
    }
    this.ctx = this.canvasRef.current.getContext('2d');
  }

  componentDidUpdate() {
    this.draw(this.scrollTop, this.scrollLeft);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  private onResize = throttle(() => {
    this.setState({ width: window.innerWidth });
  }, 10);

  private draw = (scrollTop: number, scrollLeft: number) => {
    if (this.ctx === null) {
      return;
    }
    this.ctx.clearRect(0, 0, 300, 300);
    this.ctx.fillRect(0 - scrollLeft, 190 - scrollTop, 30, 30);
    this.ctx.fillRect(200 - scrollLeft, 190 - scrollTop, 30, 30);
  };

  private onScroll = (scrollTop: number, scrollLeft: number) => {
    this.draw(scrollTop, scrollLeft);
    this.scrollTop = scrollTop;
    this.scrollLeft = scrollLeft;
  };

  render() {
    return (
      <ScrollableCanvas
        width={this.state.width}
        height={this.state.width}
        largeWidth={this.state.width * 2}
        largeHeight={this.state.width * 2}
        canvasRef={this.canvasRef}
        onScroll={this.onScroll}
      />
    );
  }
}
