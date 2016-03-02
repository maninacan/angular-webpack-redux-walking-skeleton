import actions from '../../../actions';

export default function mainController($ngRedux, $scope) {
	const self = this;

	let unSubscribe = $ngRedux.connect(onUpdate, actions.mab2Actions)(self);
	$scope.$on('$destroy', unSubscribe);

	function onUpdate(state) {
		return {
			state: state.mab2Reducer
		};
	}
}
