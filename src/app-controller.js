import models from './models';

export default function appController() {
	const self = this;

	self.navPackage = new models.NavPackage();
	self.navPackage.tab({
		label: 'Main 1',
		state: 'main-1'
	});
	self.navPackage.tab({
		label: 'Main 2',
		state: 'main-2'
	});
}
