/**
 * 
 * @param {Date} date 
 * 
 * return the array which contains list of days to be displayed
 * 
 **/
export function getDisplayedDates(date) {
 
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    let firstDayOfMonth  = new Date(currentYear, currentMonth, 1);


    let weekdayOfFirstDayOfMonth = firstDayOfMonth.getDay();

    let previousMonth = (currentMonth - 1) % 12;

    let yearOfFirstWeekday =previousMonth == 11 ? currentYear -1 : currentYear;   
  
   
    let days = [];
    const NUM_OF_WEEKS = 6;

    let lastDayOfMonth = new Date(currentYear, currentMonth, getNumberOfDayInMonth(currentMonth, currentYear));

    for (let i = 1 ; i <=  lastDayOfMonth.getDate(); i++) {
        days.push(new Date(currentYear,currentMonth,i));
    }

    let start = weekdayOfFirstDayOfMonth-1;
    for (let i =  getNumberOfDayInMonth(previousMonth, yearOfFirstWeekday) ; start  >=  0; start-- ) {
        days.unshift(new Date(yearOfFirstWeekday, previousMonth, i--));
    }

    const NUM_DAY_PER_WEEK = 7;
    const totalDays = NUM_OF_WEEKS * NUM_DAY_PER_WEEK ;

    let yearOfNextMonth = currentMonth==11 ? currentYear+1 : currentYear;
    let nextMonth = (currentMonth+1)%12;

    for (let i = 1; totalDays > days.length; i++ ) {
        days.push(new Date(yearOfNextMonth, nextMonth, i));
    }

    return days;
}


/**
 *  @param {string} month
 *  @param {string} year
 *  
 *  return number of day for that month in that year
 */


function getNumberOfDayInMonth(month, year) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthsWith31Days =  ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
    let monthsWith30Days =  ['April', 'June', 'September', 'November'];

    if(monthsWith30Days.includes(months[month])) {
        return 30;
    }
    if(monthsWith31Days.includes(months[month])) {
        return 31;
    }
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        return 29;
    }
    return 28;
}