import React, { Component, PropTypes } from 'react'

export default class AlertBubble extends Component {
    constructor (props) {
        super (props);
    }
    
    render () {
        return (
            <div className="new-notification-bubble">{this.props.number}</div>
        )
    }
}