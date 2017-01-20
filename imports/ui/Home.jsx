import React, { Component, PropTypes } from 'react'
import RecentPosts from './RecentPosts'
import PopularPosts from './PopularPosts'

export default class Home extends Component {
    render () {
        return (
            <div>
                <div className="flex-row text-center h1">project uqbar</div>
                <div className="half-width-flex">
                    <RecentPosts />
                </div>
                <div className="half-width-flex">
                    <PopularPosts />
                </div>
            </div>
        )
    }
}