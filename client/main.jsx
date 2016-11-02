import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.jsx';
import { renderRoutes } from './routes.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('uqbar'));
});