import {
	SONG_ADDED,
	MAB1_STATE_RESET
} from './actionTypes';

export function addSong(song) {
	return {
		type: SONG_ADDED,
		song
	};
}

export function resetMab1State() {
	return {
		type: MAB1_STATE_RESET
	};
}

export default {
	addSong,
	resetMab1State
}
