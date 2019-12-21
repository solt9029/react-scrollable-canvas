import React, { RefObject, Component } from 'react';
import Canvas from './Canvas';
import ScrollableCanvasContainer from './ScrollableCanvasContainer';

export interface ScrollableCanvasProps {
  width: string | number;
  height: string | number;
  largeWidth: string | number;
  largeHeight: string | number;
  wait: number;
  noScrollBar: boolean;
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
  innerRef?: RefObject<HTMLCanvasElement>;
}

export interface ScrollableCanvasState {
  scrollTop: number;
  scrollLeft: number;
}

export default class ScrollableCanvas extends Component<ScrollableCanvasProps, ScrollableCanvasState> {
  public static defaultProps: Partial<ScrollableCanvasProps> = {
    wait: 10,
    noScrollBar: false,
  };

  state = {
    scrollTop: 0,
    scrollLeft: 0,
  };

  private onScroll = (scrollTop: number, scrollLeft: number) => {
    this.setState({ scrollTop, scrollLeft });

    if (this.props.onScroll === undefined) {
      return;
    }
    this.props.onScroll(scrollTop, scrollLeft);
  };

  render() {
    return (
      <ScrollableCanvasContainer
        noScrollBar={this.props.noScrollBar}
        onScroll={this.onScroll}
        wait={this.props.wait}
        width={this.props.width}
        height={this.props.height}
        largeWidth={this.props.largeWidth}
        largeHeight={this.props.largeHeight}
      >
        <Canvas
          ref={this.props.innerRef}
          width={this.props.width}
          height={this.props.height}
          translateX={this.state.scrollLeft}
          translateY={this.state.scrollTop}
        ></Canvas>
      </ScrollableCanvasContainer>
    );
  }
}
