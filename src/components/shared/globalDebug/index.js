import GlobalDebugController from './globalDebug-controller';
import template from './globalDebug-template.html';

export default angular
  .module('roApp.components.shared.globalDebug', [])
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
