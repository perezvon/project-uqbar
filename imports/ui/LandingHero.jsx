import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LandingHero extends Component {
    render () {
        return (
<div className="hero-title">
        <div className="h1">project uqbar</div>
        <div className="h2">reality is a tightrope over the abyss.</div>
          <Link to="register">
            <button className="pu-button-light">join the project</button>
            </Link>       
          <Link to="login">Login</Link>
            </div>
            )
    }
}