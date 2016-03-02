import mainCtrl from './main-controller';
import mainService from './main-service';
import template from './main-template.html';

export default angular
	.module('myApp.components.mab2.main', [])
	.controller('mainCtrl', mainCtrl)
	.factory('mainService', mainService)
	.directive('mab2Main', () => {
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
