import angular from 'angular';
import myNavBarController from './myNavBar-controller';
import template from './myNavBar-template.html';

export default angular
	.module('myApp.components.shared.myNavBar', [])
	.controller('myNavBarController', myNavBarController)
	.directive('myNavBar', function() {
		return {
			restrict: 'E',
			scope: {
				myNav: '='
			},
			template: template,
			bindToController: true,
			controller: 'myNavBarController',
			controllerAs: 'ctrl'
		}
	})
	.name;
