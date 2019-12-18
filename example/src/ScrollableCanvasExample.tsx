import React, { Component } from 'react';
import { ScrollableCanvas } from './react-scrollable-canvas';

export default class ScrollableCanvasExample extends Component {
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private ctx: CanvasRenderingContext2D | null = null;

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
  };

  componentDidMount() {
    if (this.canvasRef.current === null) {
      return;
    }
    this.ctx = this.canvasRef.current.getContext('2d');
    this.draw(0, 0);
  }

  render() {
    return (
      <div>
        <ScrollableCanvas
          width={300}
          height={300}
          largeWidth={600}
          largeHeight={600}
          canvasRef={this.canvasRef}
          onScroll={this.onScroll}
          wait={10}
        />
      </div>
    );
  }
}
