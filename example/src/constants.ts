export const scrollableCanvasExampleCode = `import React, { Component } from 'react';
import { ScrollableCanvas } from 'react-scrollable-canvas';

const WIDTH = 300;
const HEIGHT = 300;
const LARGE_WIDTH = 600;
const LARGE_HEIGHT = 600;
const CIRCLE_RADIUS = 5;
const CIRCLE_SIZE = 30;

export default class ScrollableCanvasExample extends Component {
  private canvasRef = React.createRef<HTMLCanvasElement>();
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
      <div>
        <ScrollableCanvas
          width={WIDTH}
          height={HEIGHT}
          largeWidth={LARGE_WIDTH}
          largeHeight={LARGE_HEIGHT}
          canvasRef={this.canvasRef}
          onScroll={this.draw}
        />
      </div>
    );
  }
}
`;
