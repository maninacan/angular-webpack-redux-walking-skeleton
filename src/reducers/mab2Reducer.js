import deepFreeze from 'deep-freeze';
import {
	DATE_SELECTED,
	USER_SET,
	COUNT_INCREMENTED,
	MAB2_STATE_RESET
} from '../actions/actionTypes';

const today = new Date(),
	INITIAL_STATE = {
		selectedDate: new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate()
		),
		user: {},
		count: 0
	};

export default function mab2(state = INITIAL_STATE, action) {
	// TODO: move deepFreeze to unit tests
	//deepFreeze(state);

	switch (action.type) {
		case DATE_SELECTED:
			return {...state, selectedDate: action.selectedDate};
		case USER_SET:
			return {...state, user: action.user};
		case COUNT_INCREMENTED:
			return {...state, count: state.count + 1};
		case MAB2_STATE_RESET:
			return {...INITIAL_STATE,
				selectedDate: new Date(
					today.getFullYear(),
					today.getMonth(),
					today.getDate()
				)
			};
		default:
			return state;
	}
}
