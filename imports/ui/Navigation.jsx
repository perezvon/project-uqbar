import React, { Component } from 'react'
import { Link } from 'react-router'
import RightNav from './RightNav'

export default class Navigation extends Component {
    render () {
        return (
            <div className="header">
                <ul>
                    <Link to="/"><li>home</li></Link>
                    <Link to="about"><li>about</li></Link>
                    <Link to="dashboard"><li>dashboard</li></Link>
                    <Link to="new"><li>new story</li></Link>
                </ul>
                <RightNav auth={this.props.auth}/>
            </div>
        )
    }
}