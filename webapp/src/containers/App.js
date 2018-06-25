import React from 'react';

import Calendar from '../components/calendar/Calendar';
import Modal from '../components/modal/Modal';
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: false,
            selectedDay: null
        }
    }

    handleClick(day) {
        this.setState({
            isDisplayed: true,
            selectedDay: day
        });
    }

    closeModal() {
        this.setState({
            isDisplayed: false
        })
    }

    render() {
        return (
            <div className='calendar_container'>
                <div class='left-panel'>
                    <span class="fa fa-angle-left"></span>
                </div>
                <div class='middle-panel'>
                    <Calendar date= {this.props.date} onSelectDate={ this.handleClick.bind(this) }/>
                </div>
                <div class='right-panel'>
                    <i class="fa fa-angle-right"></i>
                </div>
                <Modal content={this.state.selectedDay && this.state.selectedDay.getDate()} isDisplayed={this.state.isDisplayed} onClose={() => this.closeModal()}></Modal>                                          
            </div>
        )
    }
}