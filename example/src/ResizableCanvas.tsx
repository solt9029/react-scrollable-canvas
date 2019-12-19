import React, { Component } from 'react';
import { throttle } from 'lodash';
import { ScrollableCanvas } from './react-scrollable-canvas';

export default class ResizableCanvas extends Component<{}, { width: number }> {
  state = {
    width: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.setState({ width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = throttle(() => {
    this.setState({ width: window.innerWidth });
    console.log(this.state.width);
  }, 10);

  render() {
    return (
      <ScrollableCanvas
        width={this.state.width}
        height={this.state.width}
        largeWidth={this.state.width * 2}
        largeHeight={this.state.width * 2}
      />
    );
  }
}
