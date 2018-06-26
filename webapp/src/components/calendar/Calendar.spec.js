

import React from 'react';
import { shallow, mount } from 'enzyme';

import Calendar from './Calendar';
import { getDisplayedDates } from '../../helpers'

describe('Testing Calendar component', function() {
    const date = new Date(2018,5,24);
    
    it('test calendar rendering including 6 weeks', () =>{
        let displayedDays = getDisplayedDates(date);
        const wrapper = shallow(<Calendar displayedDays= {displayedDays} startDate={ date } currentDate= { new Date() } />);
        expect(wrapper.find('.calendar__week').length).toBe(6);       
    });

    it('test calendar rendering including 42 days', () => {
        let displayedDays = getDisplayedDates(date);
        const wrapper = mount(<Calendar displayedDays= {displayedDays} startDate={ date }  currentDate= { new Date() } />);
        expect(wrapper.find('.calendar__day').length).toBe(42);       
    });

    it('test calendar rendering: the current day should have blue background', () => {
        let displayedDays = getDisplayedDates(date);
        let currentDate = new Date(2018,5,25);
        const wrapper = mount(<Calendar displayedDays= {displayedDays} startDate={ date }  currentDate= { currentDate } />);
        let blueHighlightedDay = null;
        
        wrapper.find('.calendar__day').forEach(
            day => {               
                if(window.getComputedStyle(day.getDOMNode()).getPropertyValue('background-color').trim() === 'blue') {
                    blueHighlightedDay = day;
                }      
            }
        );

        expect(blueHighlightedDay.text().trim()).toEqual("25");
    });
});