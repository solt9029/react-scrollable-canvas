import React, { createRef, Component } from 'react';
import styled, { css } from 'styled-components';
import { throttle } from 'lodash';
import { convertNumberToStringPx } from './utils';

export interface DivProps {
  width: string | number;
  height: string | number;
}

export const Div = styled.div<DivProps>`
  width: ${({ width }) => convertNumberToStringPx(width)};
  height: ${({ height }) => convertNumberToStringPx(height)};
`;

export interface ScrollContainerProps {
  noScrollBar: boolean;
}

export const ScrollContainer = styled(Div)<ScrollContainerProps>`
  overflow: auto;
  overflow-y: scroll;
  ${({ noScrollBar }) =>
    noScrollBar
      ? css`
          -ms-overflow-style: none; /* for IE, Edge */
          scrollbar-width: none; /* for Firefox */
          ::-webkit-scrollbar {
            display: none; /* for Chrome, Safari */
          }
        `
      : ``}
`;

export const LargeContainer = styled(Div)`
  overflow: hidden;
`;

export const Stage = styled.div`
  position: relative;
  outline: none;
`;

export interface ScrollableCanvasContainerProps {
  width: string | number;
  height: string | number;
  largeWidth: string | number;
  largeHeight: string | number;
  wait: number;
  noScrollBar: boolean;
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
  children: React.ReactNode;
}

export default class ScrollableCanvasContainer extends Component<ScrollableCanvasContainerProps, {}> {
  public static defaultProps: Partial<ScrollableCanvasContainerProps> = {
    wait: 10,
    noScrollBar: false,
  };

  private ref = createRef<HTMLDivElement>();

  private onScroll = throttle(() => {
    if (this.ref.current === null || this.props.onScroll === undefined) {
      return;
    }
    const { scrollTop, scrollLeft } = this.ref.current;
    this.props.onScroll(scrollTop, scrollLeft);
  }, this.props.wait);

  componentDidMount() {
    if (this.ref.current === null) {
      return;
    }
    this.ref.current.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    if (this.ref.current === null) {
      return;
    }
    this.ref.current.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { width, height, largeWidth, largeHeight, noScrollBar, children } = this.props;

    return (
      <ScrollContainer noScrollBar={noScrollBar} width={width} height={height} ref={this.ref}>
        <LargeContainer width={largeWidth} height={largeHeight}>
          <Stage>{children}</Stage>
        </LargeContainer>
      </ScrollContainer>
    );
  }
}
