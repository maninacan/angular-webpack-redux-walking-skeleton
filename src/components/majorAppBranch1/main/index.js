import mainCtrl from './main-controller';
import mainService from './main-service';
import template from './main-template.html';

export default angular
	.module('myApp.components.mab1.main', [])
	.controller('mainCtrl', mainCtrl)
	.factory('mainService', mainService)
	.directive('mab1Main', () => {
		return {
			restrict: 'E',
			template: template,
			replace: true,
			scope: {},
			bindToController: true,
			controller: mainCtrl,
			controllerAs: 'ctrl'
		};
	})
	.name;
