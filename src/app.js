import angular from 'angular';
import ngRedux from 'ng-redux';
import 'angular-bootstrap';
import uiRouter from 'angular-ui-router';

import stdEnv from './../polyfills/arrays';
import reduxConfig from './app.config.redux';
import routerConfig from './app.config.router';

import components from './components';
import appController from './app-controller';
import './styles/app.scss';

/**
 * Standardize the browser environment with polyfills.
 */
stdEnv();

/**
 * Declare myApp module
 */
export default angular
	.module('myApp', [
		'ui.bootstrap',
		uiRouter,
		ngRedux,
		components
	])
	.controller('appController', appController)
	.config(routerConfig)
	.config(reduxConfig)
	.name;
