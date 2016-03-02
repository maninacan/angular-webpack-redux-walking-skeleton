import actions from '../../../actions';

export default function mainController($ngRedux, $scope, itunesApi) {
	const self = this;

	let unSubscribe = $ngRedux.connect(onUpdate, actions.mab1Actions)(self);
	$scope.$on('$destroy', unSubscribe);

	function onUpdate(state) {
		return {
			state: state.mab1Reducer
		};
	}

	itunesApi.getMormonTabernacleChoirData().then(response => {
		console.log('results: ', response.results);
		const songs = response.results
		.filter(result => {
			return result.artistName === 'Mormon Tabernacle Choir' && result.kind === 'song';
		})
		.map(result => {
			const {
				artworkUrl100,
				collectionName,
				trackName,
				trackCount,
				trackNumber,
				trackPrice,
				primaryGenreName,
				trackViewUrl,
				trackTimeMillis
			} = result;
			return {
				artworkUrl100,
				collectionName,
				trackName,
				trackCount,
				trackNumber,
				trackPrice,
				primaryGenreName,
				trackViewUrl,
				trackTimeMillis
			};
		});

		console.log('songs: ', songs);
		songs.forEach(song => {
			self.addSong(song);
		});

	});
}
