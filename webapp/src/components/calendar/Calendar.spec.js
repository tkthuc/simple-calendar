

import React from 'react';
import { shallow, mount } from 'enzyme';

import Calendar from './Calendar';

describe('Testing Calendar component', function() {
    const date = new Date(2018,5,24);
    it('test calendar rendering including 6 weeks', () =>{
        const wrapper = shallow(<Calendar date={ date } />);
        expect(wrapper.find('.calendar__week').length).toBe(6);       
    });

    it('test calendar rendering including 42 days', () => {
        const wrapper = mount(<Calendar date={ date } />);
        expect(wrapper.find('.calendar__day').length).toBe(42);       
    });
});