export default function itunesApiService($http) {
	'ngInject';

	function getMormonTabernacleChoirData() {

		return new Promise((resolve, reject) => {
			function itunesCallback(response) {
				console.log(response);
			}
			const req = {
				method: 'JSONP',
				url: `https://itunes.apple.com/search?term=mormon+tabernacle+choir&callback=JSON_CALLBACK`
			}

			$http(req)
				.then(response => {
					if (response.status >= 200 && response.status < 400) {
						const itunesResults = response.data;
						resolve(itunesResults);
					} else {
						reject(Error(response));
					}
				})
				.catch(e => {
					if (e.status === 500) {
						reject(Error(e, 'Internal Server Error'));
					} else {
						reject(Error(e));
					}
				});
		});
	}

	return {
		getMormonTabernacleChoirData: getMormonTabernacleChoirData
	};
};
