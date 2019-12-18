import React from 'react';
import { shallow, configure } from 'enzyme';
import ScrollableCanvasContainer from '../src/ScrollableCanvasContainer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('ScrollableCanvasContainer', () => {
  it('should render children', () => {
    const wrapper = shallow(
      <ScrollableCanvasContainer>
        <canvas></canvas>
      </ScrollableCanvasContainer>,
    );

    expect(wrapper.find('canvas').length).toBe(1);
  });
});
