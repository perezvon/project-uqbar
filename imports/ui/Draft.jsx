import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Draft extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="flex-row draft-list-row">
                <div className="h2">{this.props.title}</div>
            </div>
        )
    }
    
}