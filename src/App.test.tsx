import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import App from './App';

describe("APP View", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("should render correctly", () => expect(wrapper).toMatchSnapshot());
});
