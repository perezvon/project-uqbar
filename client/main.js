import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App';
import { renderRoutes } from './routes';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('uqbar'));
});

