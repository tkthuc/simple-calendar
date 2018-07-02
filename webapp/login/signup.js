import React from 'react';


export default class SignUp extends React.Component {


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

    signup(username, password) {
        fetch("/signup", {
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
                        message: 'Username already taken'
                    })
                } else {
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
      return  (
            <div className='container'>
                <div>
                    <h1><span className='fa fa-sign-in'></span> Signup</h1>
                </div>         

                <div>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.setUsername.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.setPassword.bind(this)}/>
                        </div>
                        <div className='text-danger'> {this.state.message} </div>

                        <button  onClick= { () => this.signup(this.state.username, this.state.password) } className="btn btn-warning btn-lg">Signup</button>

                </div>

                <hr/>

                <p>Already have an account? <a href="/login">Login</a></p>
                <p>Or go <a href="/">home</a>.</p>

            </div>)
    }

}