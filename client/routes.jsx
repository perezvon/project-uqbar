import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../imports/ui/App'
import {Home} from '../imports/ui/Home'
import LandingPage from '../imports/ui/LandingPage'
import LandingHero from '../imports/ui/LandingHero'
import Register from '../imports/ui/Register'
import Login from '../imports/ui/Login'
import {Dashboard} from '../imports/ui/Dashboard'
import {NewPost} from '../imports/ui/NewPost'
import ViewPost from '../imports/ui/ViewPost'
import ViewDraft from '../imports/ui/ViewDraft'
import About from '../imports/ui/About'
import Profile from '../imports/ui/Profile'
import RecentPosts from '../imports/ui/RecentPosts'
import NotFoundPage from '../imports/ui/NotFoundPage'
import EditProfile from '../imports/ui/EditProfile'

const requireAuth = (nextState, replace) => {
  if (!Meteor.user()) {
    replace({ pathname: 'login' })
  }
}

const firstVisitCheck = (nextState, replace) => {
	if (!Meteor.user() && !browserHistory) {
		replace({ pathname: 'join' })
	}
}

export const renderRoutes = () => (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
        <Route path="join" component={LandingPage} >
            <IndexRoute component={LandingHero} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </Route>
        <Route path="/" component={App} onEnter={firstVisitCheck}>
            <IndexRoute component={Home} />
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
            <Route path="new" component={NewPost} onEnter={requireAuth} />
            <Route path="about" component={About} />
            <Route path="/profile/:username" component={Profile} />
			<Route path="/profile/:username/edit" component={EditProfile} onEnter={requireAuth} />
            <Route path="/:username/:slug" component={ViewPost} />
            <Route path="/:username/:slug/draft" component={ViewDraft} onEnter={requireAuth} />
            <Route path="*" component={NotFoundPage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
    </Router>
    );