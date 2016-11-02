import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LandingPage extends Component {
  render () {
    return (
        <div className="flex-container hero">
      <div className="flex-row hero-title">
        <div className="h1">project uqbar</div>
        <div className="h2">reality is a tightrope over the abyss.</div>
          <Link to="register">
            <button className="pu-button">join the project</button>
            </Link>       
          <Link to="login">Login</Link>
            </div>
        </div>
    )
  }
}


