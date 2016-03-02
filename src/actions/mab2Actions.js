import {
	DATE_SELECTED,
	USER_SET,
	COUNT_INCREMENTED,
	MAB1_STATE_RESET
} from './actionTypes';

export function selectDate(selectedDate) {
	return {
		type: DATE_SELECTED,
		selectedDate
	};
}

export function setUser(user) {
	return {
		type: USER_SET,
		user
	};
}

export function incrementCount() {
	return {
		type: COUNT_INCREMENTED
	};
}

export function resetMab2State() {
	return {
		type: MAB1_STATE_RESET
	};
}

export default {
	selectDate,
	setUser,
	incrementCount,
	resetMab2State
}
