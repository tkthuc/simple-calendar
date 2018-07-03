import React from 'react';
import { connect } from 'react-redux'
import { updateUserInfo } from '../store/actions';
 

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.username = "";
        this.password = "";

        this.state = {
            message : "",
            username: "",
            password: ""
        }
    }

    setUsername(event) {
        this.setState({
            username : event.target.value
        })
    }

    setPassword(event) {
        this.setState({
            password : event.target.value
        })
    }

    authenticate(username, password) {
        fetch("/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ username : username, password: password})
        }).then(
            (response) => {
                const headers = response.headers;
                if(response.status === 401) {
                    this.setState({
                        message: 'Wrong username or password'
                    })
                } else {
                    this.props.updateUserInfo( { username });
                    this.props.history.push(`/profile/${username}`);                   
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    render() {
        return (
            <div className='container'>
                <h1><span className='fa fa-sign-in'> Login </span></h1>               
                <div>                   
                    <div className='form-group'>
                        <label>
                            Username
                        </label>
                        <input type='text' className="form-control" name="username" value={this.state.username} onChange={this.setUsername.bind(this)}/>
                    </div>
                    <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.setPassword.bind(this)}/>
                    </div>
                    <div className='text-danger'> {this.state.message} </div>
                    <button onClick= { () => this.authenticate(this.state.username, this.state.password) } className="btn btn-warning btn-lg">Login</button> 
                    {/* <button type="submit" className="btn btn-warning btn-lg">Login</button> */}
                </div>
                <p>Need an account? <a href="/signup">Signup</a></p>
                <p>Or go <a href="/">home</a>.</p>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
})

const mapDispatchToProps = dispatch => ({
    updateUserInfo: userInfo => dispatch(updateUserInfo(userInfo))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);