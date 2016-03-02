import api from './api';
import globalDebug from './globalDebug';
import myNavBar from './myNavBar';
import parentScrollDisable from './parentScrollDisable';

export default angular
	.module('roApp.components.shared', [
		api,
	  globalDebug,
		myNavBar,
		parentScrollDisable
	])
	.name;
