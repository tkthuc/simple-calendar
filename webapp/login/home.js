import React from 'react';

import { Link } from 'react-router-dom';

export default class Home extends React.Component {

    render() {
        return (
            <div className="jumbotron">
                   <div className="text-center">
                        <h1><span className="fa fa-lock"></span>  Welcome to The Simple Calendar</h1>
                        <p>Please choose one these actions</p>
                    </div>

                    <div className="login-options">    
                        <div className="right"><span className="fa fa-user"></span> <Link to='/login'>Login</Link></div>
                        <div className="left"><span className="fa fa-user"></span> <Link to='/signup'>Sign Up</Link></div>
                    </div>
            </div>
        )
    }
}