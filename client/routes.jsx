import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../imports/ui/App';
import LandingPage from '../imports/ui/LandingPage';
import LandingHero from '../imports/ui/LandingHero';
import Register from '../imports/ui/Register';
import Login from '../imports/ui/Login';
import Dashboard from '../imports/ui/Dashboard';
import NewPost from '../imports/ui/NewPost';
import ViewPost from '../imports/ui/ViewPost';
import ViewDraft from '../imports/ui/ViewDraft';
import RecentPosts from '../imports/ui/RecentPosts';
import NotFoundPage from '../imports/ui/NotFoundPage';

const requireAuth = (nextState, replace) => {
  if (!Meteor.user()) {
    replace({ pathname: 'login' })
  }
}

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="join" component={LandingPage} >
            <IndexRoute component={LandingHero} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </Route>
        <Route path="/" component={App} >
            <IndexRoute component={RecentPosts} />
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
            <Route path="new" component={NewPost} onEnter={requireAuth} />
            <Route path="/:username/:slug" component={ViewPost} />
            <Route path="/:username/:slug/draft" component={ViewDraft} />
            <Route path="*" component={NotFoundPage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
    </Router>
    );