import React from 'react';
import { shallow, configure } from 'enzyme';
import Button from '../src/Button';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('小コンポーネントが存在すること', () => {
  const wrapper = shallow(<Button text="ボタンです" flag={true} action={() => console.log('test')} />);

  expect(wrapper.find('button').length).toBe(1);
  expect(wrapper.find('p').length).toBe(1);

  expect(wrapper.find('p').text()).toEqual('ボタンです');
});

test('pコンポーネントが表示されないこと', () => {
  const wrapper = shallow(<Button text="ボタンです" flag={false} action={() => console.log('test')} />);

  expect(wrapper.find('button').length).toBe(1);
  expect(wrapper.find('p').length).toBe(0);
});

test('イベント発火時にコールバック関数が呼び出されること', () => {
  const Spy = jest.fn();
  const wrapper = shallow(<Button text="ボタンです" flag={true} action={Spy} />);

  wrapper.find('button').simulate('click');
  expect(Spy).toHaveBeenCalledWith();
});
