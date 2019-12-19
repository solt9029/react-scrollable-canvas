import React, { Component, createRef } from 'react';
import { throttle } from 'lodash';
import { ScrollableCanvas } from './react-scrollable-canvas';

export default class ResizableCanvas extends Component<{}, { size: number }> {
  private canvasRef = createRef<HTMLCanvasElement>();
  private ctx: CanvasRenderingContext2D | null = null;
  private scrollTop = 0;
  private scrollLeft = 0;
  state = {
    size: 300,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.setState({ size: window.innerWidth });

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
    this.setState({ size: window.innerWidth });
  }, 10);

  private draw = (scrollTop: number, scrollLeft: number) => {
    if (this.ctx === null) {
      return;
    }
    this.ctx.clearRect(0, 0, this.state.size * 2, this.state.size * 2);
    this.ctx.beginPath();
    const gradient = this.ctx.createLinearGradient(-scrollLeft, -scrollTop, this.state.size * 2, this.state.size * 2);
    gradient.addColorStop(0.0, 'rgb(255, 0, 0)');
    gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
    gradient.addColorStop(1.0, 'rgb(0, 0, 255)');
    this.ctx.fillStyle = gradient;
    this.ctx.rect(-scrollLeft, -scrollTop, this.state.size * 2, this.state.size * 2);
    this.ctx.fill();
  };

  private onScroll = (scrollTop: number, scrollLeft: number) => {
    this.draw(scrollTop, scrollLeft);
    this.scrollTop = scrollTop;
    this.scrollLeft = scrollLeft;
  };

  render() {
    return (
      <ScrollableCanvas
        width={this.state.size}
        height={this.state.size}
        largeWidth={this.state.size * 2}
        largeHeight={this.state.size * 2}
        canvasRef={this.canvasRef}
        onScroll={this.onScroll}
      />
    );
  }
}
