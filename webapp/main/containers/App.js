import React from 'react';

import { connect } from 'react-redux';

import Calendar from '../components/calendar/Calendar';
import Modal from '../components/modal';
import {getDisplayedDates} from '../helpers';

import { updateSelectedDate } from '../../store/actions';
import './App.css';

import '../styles.css'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDate(date) {
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
class App extends React.Component {
    constructor(props) {
        super(props);    

        let today = new Date();

        let displayedDays =  getDisplayedDates(new Date());
        let displayedMonth = today.getMonth();
        let displayedYear = today.getFullYear();

        this.state = {
            isDisplayed: false,
            todos: [],
            currentDate: today,
            displayedDays,
            displayedMonth,
            displayedYear,
            currentPage:1,
            recordsPerPage:10
        }

       
    }

    async handleClick(day) {
          

        let raw = await fetch(`${window.location.origin}/todos/${this.props.userInfo.username}?startDate="${getDate(day)}"&endDate="${getDate(day)}"&perPage=${this.state.recordsPerPage}&page=${this.state.currentPage}`)
        let response = await raw.json();

        this.setState({
            isDisplayed: true,
            todos: response.todos,
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            selectedDate: day
        });


    }

    closeModal() {
        this.setState({
            isDisplayed: false
        })
    }

    showPrevious() {
        
        let month = ( this.state.displayedMonth + 11 ) % 12;

        let year = (month == 11) ? this.state.displayedYear - 1 : this.state.displayedYear;

        let nextStartDate = new Date(year, month, 1);
       
        
        this.setState({
            displayedDays: getDisplayedDates(nextStartDate),
            displayedMonth: month,
            displayedYear: year
        });
    }

    showNext() {

        let month = ( this.state.displayedMonth + 1 ) % 12;

        let year = (month == 0) ? this.state.displayedYear + 1 : this.state.displayedYear;

        let nextStartDate = new Date(year, month, 1);
        
        this.setState({
            displayedDays: getDisplayedDates(nextStartDate),
            displayedMonth: month,
            displayedYear: year
        });
    }

    getNextItems() {

            if(Math.ceil(this.state.todos.length/this.state.recordsPerPage) == this.state.totalPages ) {
                return Promise.resolve();
            }

            let day = this.state.selectedDate;


            return fetch(`${window.location.origin}/todos/${this.props.userInfo.username}?startDate="${getDate(day)}"&endDate="${getDate(day)}"&perPage=${this.state.recordsPerPage}&page=${parseInt(this.state.currentPage)+1}`)
                    .then(
                        raw => raw.json()
                    )
                    .then(
                        response =>  this.setState({
                            isDisplayed: true,
                            todos: [...this.state.todos, ...response.todos],
                            currentPage: response.currentPage,
                            totalPages: response.totalPages
                        })
                    )            
                    .catch(err => console.log(err))         

       
      

    }

    render() {
        return (
            <div className='calendar_container'>
                <div className='left-panel'>
                    <i className="fa fa-angle-left big-icon" onClick={ this.showPrevious.bind(this) }></i>
                </div>
                <div className='middle-panel'>
                    <Calendar displayedDays= {this.state.displayedDays} currentDate={this.state.currentDate} 
                        displayedMonth = { this.state.displayedMonth }
                        displayedYear = { this.state.displayedYear }
                        onSelectDate={ this.handleClick.bind(this) }/>
                </div>
                <div className='right-panel'>
                    <i className="fa fa-angle-right big-icon" onClick={ this.showNext.bind(this) } ></i>
                </div>
                <Modal content={ this.state.todos } isDisplayed={this.state.isDisplayed} onClose={() => this.closeModal()} getNextItems={this.getNextItems.bind(this)}></Modal>                                          
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfo :  state.userInfo
});

const mapDispatchToProps = dispatch => ({
    updateSelectedDate :  ({ todos, date }) => dispatch(updateSelectedDate({todos,date}))
});


export default connect(
    mapStateToProps,    
    null 
)(App);