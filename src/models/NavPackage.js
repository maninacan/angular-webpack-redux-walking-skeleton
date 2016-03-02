export default class NavPackage{
	constructor() {
  	this.tabs = [];
	}
	tab(tab) {
		const index = this.tabs.indexOf(tab);
		if (index < 0) {
			this.tabs.push({label: tab.label, state: tab.state});
		} else {
			return tab;
		}
	}
}
