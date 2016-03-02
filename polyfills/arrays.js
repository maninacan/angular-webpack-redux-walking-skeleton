export default function () {

	//polyfills should be written or imported into this file.
	if (!Array.prototype.find) {
		Array.prototype.find = function (...args) {
			return this.filter(...args)[0];
		};
	}
}
