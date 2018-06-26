import React from 'react';

import Calendar from '../components/calendar/Calendar';
import Modal from '../components/modal/Modal';
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: false,
            selectedDay: props.date            
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

    showPrevious() {
        let date = this.state.selectedDay;
        this.setState({
            selectedDay: new Date(date.setDate(date.getDate()-30))
        })
    }

    showNext() {
        let date = this.state.selectedDay;
        this.setState({
            selectedDay: new Date(date.setDate(date.getDate()+30))
        })
    }

    render() {
        return (
            <div className='calendar_container'>
                <div class='left-panel'>
                    <i class="fa fa-angle-left big-icon" onClick={ this.showPrevious.bind(this) }></i>
                </div>
                <div class='middle-panel'>
                    <Calendar date= {this.state.selectedDay} onSelectDate={ this.handleClick.bind(this) }/>
                </div>
                <div class='right-panel'>
                    <i class="fa fa-angle-right big-icon" onClick={ this.showNext.bind(this) } ></i>
                </div>
                <Modal content={this.state.selectedDay && this.state.selectedDay.getDate()} isDisplayed={this.state.isDisplayed} onClose={() => this.closeModal()}></Modal>                                          
            </div>
        )
    }
}