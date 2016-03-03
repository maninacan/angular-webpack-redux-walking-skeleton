export default ($stateProvider, $urlRouterProvider) => {
	'ngInject';

	//setup URL routes
	$stateProvider
		.state('main-1', {
			url: '/main-1',
			template: '<mab1-main></mab1-main>'
		})
		.state('main-2', {
			url: '/main-2',
			template: '<mab2-main></mab2-main>'
		});

	$urlRouterProvider.otherwise('main-1');
}
