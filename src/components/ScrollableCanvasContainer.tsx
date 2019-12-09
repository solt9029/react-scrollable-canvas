import React, { createRef, Component } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';

export interface DivProps {
  width: number;
  height: number;
}

export const Div = styled.div<DivProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export const ScrollContainer = styled(Div)`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const LargeContainer = styled(Div)`
  overflow: hidden;
`;

export const Stage = styled.div`
  position: relative;
  outline: none;
`;

export interface ScrollableCanvasContainerProps {
  width: number;
  height: number;
  largeWidth: number;
  largeHeight: number;
  wait?: number;
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
  children: React.ReactNode;
}

export default class ScrollableCanvasContainer extends Component<ScrollableCanvasContainerProps, {}> {
  public static defaultProps: Partial<ScrollableCanvasContainerProps> = {
    wait: 10,
    onScroll: (_scrollTop, _scrollLeft) => {
      //
    },
  };

  ref = createRef<HTMLInputElement>();

  onScroll = throttle(() => {
    const { scrollTop, scrollLeft } = this.ref.current;
    this.props.onScroll(scrollTop, scrollLeft);
  }, this.props.wait);

  componentDidMount() {
    this.ref.current.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.ref.current.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { width, height, largeWidth, largeHeight, children } = this.props;

    return (
      <ScrollContainer width={width} height={height} ref={this.ref}>
        <LargeContainer width={largeWidth} height={largeHeight}>
          <Stage>{children}</Stage>
        </LargeContainer>
      </ScrollContainer>
    );
  }
}
