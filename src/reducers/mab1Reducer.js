import deepFreeze from 'deep-freeze';
import {
	SONG_ADDED,
	MAB1_STATE_RESET
} from '../actions/actionTypes';

const today = new Date(),
	INITIAL_STATE = {
		songs: []
	};

export default function mab1(state = INITIAL_STATE, action) {
	// TODO: move deepFreeze to unit tests
	//deepFreeze(state);

	switch (action.type) {
		case SONG_ADDED:
			return {
				...state,
				songs: [...state.songs, action.song]
			};
		case MAB1_STATE_RESET:
			return {...INITIAL_STATE};
		default:
			return state;
	}
}
