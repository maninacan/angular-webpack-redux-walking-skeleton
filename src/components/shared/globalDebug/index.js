import GlobalDebugController from './globalDebug-controller';
import template from './globalDebug-template.html';
import parentScrollDisable from '../parentScrollDisable';

export default angular
  .module('roApp.components.shared.globalDebug', [
    parentScrollDisable
  ])
  .controller('GlobalDebugController', GlobalDebugController)
  .directive('globalDebug', () => {
    return {
      restrict: 'E',
      controller: 'GlobalDebugController',
      controllerAs: 'vm',
      bindToController: true,
      template: template
    };
  })
  .name;
