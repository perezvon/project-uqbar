import React from 'react'
import RecentPosts from './RecentPosts'
import PopularPosts from './PopularPosts'

export const Home = () => (
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