import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {createNewProfiles} from './profilesScript'
import App from '../imports/ui/App';
import { renderRoutes } from './routes';

Meteor.startup(() => {
	createNewProfiles();
  render(renderRoutes(), document.getElementById('uqbar'));
});

