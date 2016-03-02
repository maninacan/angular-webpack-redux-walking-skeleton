import itunesApiService from './itunesApi-service';

export default angular
	.module('roApp.components.mab1.api.itunesApi', [])
	.factory('itunesApi', itunesApiService)
	.name;
