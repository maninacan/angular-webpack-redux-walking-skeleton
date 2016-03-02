import majorAppBranch1 from './majorAppBranch1';
import majorAppBranch2 from './majorAppBranch2';
import shared from './shared';

export default angular
	.module('app.components', [
		majorAppBranch1,
		majorAppBranch2,
		shared
	])
	.name;
