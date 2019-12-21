import React, { createRef, Component, RefObject } from 'react';
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
  innerRef?: RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export default class ScrollableCanvasContainer extends Component<ScrollableCanvasContainerProps, {}> {
  public static defaultProps: Partial<ScrollableCanvasContainerProps> = {
    wait: 10,
    noScrollBar: false,
    innerRef: createRef<HTMLDivElement>(),
  };

  private onScroll = throttle(() => {
    if (
      this.props.innerRef === undefined ||
      this.props.innerRef.current === null ||
      this.props.onScroll === undefined
    ) {
      return;
    }
    const { scrollTop, scrollLeft } = this.props.innerRef.current;
    this.props.onScroll(scrollTop, scrollLeft);
  }, this.props.wait);

  componentDidMount() {
    if (this.props.innerRef === undefined || this.props.innerRef.current === null) {
      return;
    }
    this.props.innerRef.current.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    if (this.props.innerRef === undefined || this.props.innerRef.current === null) {
      return;
    }
    this.props.innerRef.current.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { width, height, largeWidth, largeHeight, noScrollBar, children } = this.props;

    return (
      <ScrollContainer noScrollBar={noScrollBar} width={width} height={height} ref={this.props.innerRef}>
        <LargeContainer width={largeWidth} height={largeHeight}>
          <Stage>{children}</Stage>
        </LargeContainer>
      </ScrollContainer>
    );
  }
}
