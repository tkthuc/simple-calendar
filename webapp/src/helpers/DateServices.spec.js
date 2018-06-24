
import React from 'react';

import { getNumberOfDayInMonth, getDisplayedDates } from './DateServices';

describe('Test Services for Date', function() {
    it('testing getDateInMonth return correct number of days ', () => {
        [0,2,4,6,7,9,11].forEach(month => {
            expect(getNumberOfDayInMonth(month, 2018)).toEqual(31);  
        });
        [3,5,8,10].forEach(month => {
            expect(getNumberOfDayInMonth(month, 2018)).toEqual(30);  
        });   
        
        expect(getNumberOfDayInMonth(1,2000)).toEqual(29);
        expect(getNumberOfDayInMonth(1,1998)).toEqual(28);
        expect(getNumberOfDayInMonth(1,1900)).toEqual(28);
    });

    it('testing getDisplayDates return list of displayed days', () => {
        let date = new Date(2018,5,22);
        let days = getDisplayedDates(date);

        expect(days.length).toBe(42);
        expect(days[0].getDay()).toBe(0);
        expect(days[41].getDay()).toBe(6);

        expect(days[0].getDate()).toBe(27);
        expect(days[0].getMonth()).toBe(4);
        expect(days[34].getDate()).toBe(30);
        expect(days[41].getMonth()).toBe(6);
    });
});