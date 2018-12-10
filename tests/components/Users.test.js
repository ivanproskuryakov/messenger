import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Users from '../../app/components/Users';

configure({ adapter: new Adapter() });

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Users />);
  });

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  });
});
