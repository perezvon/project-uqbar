import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Register extends Component {
    constructor(props){
    super(props);
    this.state = {
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
    handleSubmit(e){
    e.preventDefault();
    let username = document.getElementById("signup-username").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    let profile = {};
    profile.authorname = document.getElementById("signup-authorname").value;
    profile.newsletter = document.getElementById("signup-newsletter").value;
    this.setState({error: "test"});
    Accounts.createUser({email: email, username: username, password: password, profile: profile}, (err) => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
          Meteor.loginWithPassword(email, password, (err) => {
             if (err) {
                this.setState({
                error: err.reason
                });
             } else { 
                browserHistory.push('/');
                Bert.alert( 'Registration successful! Welcome to uqbar, ' + username + '.', 'success');
             }
          });
      }
    });
  }
    
    render () {
        return (
            <div>
                <div className="h2">
                    Register
                </div>
                <div className="flex-row">
                    <form className="register" onSubmit={this.handleSubmit}>
                        <div className="form-control">
                        <label htmlFor="signup-username">Username: </label>
                        <input type="text" id="signup-username" className="form-input" required />
                        </div>
                        <div className="form-control">
                        <label htmlFor="signup-authorname">Your Name: </label> 
                        <input type="text" id="signup-authorname" className="form-input" required />
                        </div>
                        <div className="form-control">
                        <label htmlFor="signup-email">Email Address: </label>
                        <input type="email" id="signup-email" className="form-input" required />
                        </div>
                        <div className="form-control">
                        <label htmlFor="signup-password">Password: </label>
                        <input type="password" id="signup-password" className="form-input" required />
                        </div>
                        <div className="form-control">
                        <label htmlFor="signup-newsletter">Newsletter: </label>
                        <input type="checkbox" className="square-checkbox" id="signup-newsletter" value="newsletter" checked />
                        </div>
                        <input className="pu-button-light" type="submit" value="register" /> 
                    </form>
                    <div className="login-link">Already Registered? <Link to="login">Login</Link></div>
                </div>
            </div>
        )
    }
}