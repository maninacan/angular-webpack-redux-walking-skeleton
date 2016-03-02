import angular from 'angular';
import songCardController from './songCard-controller';
import template from './songCard-template.html';

export default angular
	.module('myApp.components.mab1.songCard', [])
	.controller('songCardController', songCardController)
	.directive('songCard', () => {
		return {
			restrict: 'E',
			scope: {
				mySong: '='
			},
			template: template,
			bindToController: true,
			controller: 'songCardController',
			controllerAs: 'ctrl'
		}
	})
	.name;
