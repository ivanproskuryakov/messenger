import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Conversation from '../../app/components/Conversation';

configure({ adapter: new Adapter() });

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Conversation />);
  });

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  });
});
