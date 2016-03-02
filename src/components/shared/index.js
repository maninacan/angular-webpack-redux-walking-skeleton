import api from './api';
import globalDebug from './globalDebug';
import myNavBar from './myNavBar';

export default angular
	.module('roApp.components.shared', [
		api,
	  globalDebug,
		myNavBar
	])
	.name;
