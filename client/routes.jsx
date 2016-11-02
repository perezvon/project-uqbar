import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../imports/ui/App';
import LandingPage from '../imports/ui/LandingPage';
import Register from '../imports/ui/Register';
import Login from '../imports/ui/Login';
import Dashboard from '../imports/ui/Dashboard';
import NewPost from '../imports/ui/NewPost';
import RecentPosts from '../imports/ui/RecentPosts';
import NotFoundPage from '../imports/ui/NotFoundPage';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="join" component={LandingPage} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path="/" component={App}>
            <IndexRoute component={RecentPosts} />
            <Route path="dashboard" component={Dashboard} />
            <Route path="new" component={NewPost} />
            <Route path="*" component={NotFoundPage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
    </Router>
    );