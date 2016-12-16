import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Draft extends Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        let draftSlug = this.props.slug + '/draft';
        return (
            <div className="flex-row draft-list-row"> 
                <Link to={draftSlug}>
                    <div className="h2">{this.props.title}</div>
                </Link>
            </div>
        )
    }
    
}