import React, { Component } from 'react'

export default class Chat extends Component {
    render () {
        return (
            <div className="chat">
                <div id="chat-toggle">
                      <span className="chat-line chat-line-1"></span>
                      <span className="chat-line chat-line-2"></span>
                </div>
                <div className="chat-container">
                  <div className="chat-owner">userName (10:36:00 AM):</div> <div className="chat-comment" draggable="true">hi!</div>
                </div>
                <div className="chat-input-container">
                    <input className="chat-input" id="comment"></input>
                </div>
            </div>
        )
    }
}