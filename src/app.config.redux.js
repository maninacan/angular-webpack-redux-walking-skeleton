import createLogger from 'redux-logger';
import * as Immutable from 'immutable';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { combineReducers } from 'redux';
import ngReduxRouter from 'redux-ui-router';

/**
 * Set up redux logger
 */
const logger = createLogger({
	level: 'info',
	collapsed: true,
	stateTransformer: (state) => {
		var newState = {};
		for (var i of Object.keys(state)) {
			if (Immutable.Iterable.isIterable(state[i])) {
				newState[i] = state[i].toJS();
			} else {
				newState[i] = state[i];
			}
		}
		return newState;
	}
});

export default ($ngReduxProvider) => {
	'ngInject';

	let reducer = combineReducers({...reducers, ngReduxRouter});
	$ngReduxProvider.createStoreWith(reducer, [thunk, logger]);
};