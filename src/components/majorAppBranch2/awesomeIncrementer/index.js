import angular from 'angular';
import awesomeIncrementerController from './awesomeIncrementer-controller';
import template from './awesomeIncrementer-template.html';

export default angular
	.module('app.components.mab2.awesomeIncrementer', [])
	.controller('awesomeIncrementerController', awesomeIncrementerController)
	.directive('awesomeIncrementer', function() {
		return {
			restrict: 'E',
			scope: {
				onIncrement: '&',
				incrementValue: '='
			},
			template: template,
			bindToController: true,
			controller: 'awesomeIncrementerController',
			controllerAs: 'ctrl'
		};
	})
	.name;
