import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

export default class Login extends Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit (e) {
        e.preventDefault();
        let username = document.getElementById("login-username").value;
        let password = document.getElementById("login-password").value;
        Meteor.loginWithPassword(username, password, (err) => {
            if (err) {
                Bert.alert(err.reason, 'danger');
            } else {
                Bert.alert("Welcome back, " + username + "!", 'success');
                browserHistory.push('/');
            }
        })
    }
    
    render () {
        return (
            <div>
            <div className="h2">Login Page</div>
                <form className="login" onSubmit={this.handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="login-username">Username:</label> 
                        <input type="username" id="login-username" className="form-input" required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="login-password">Password:</label> 
                        <input type="password" id="login-password" className="form-input" required />
                    </div>
                    <input type="submit" className="pu-button" value="Login" />
                </form>
                <div className="register-link">New User? <Link to="register">Register</Link></div>
            </div>
        )
    }
}