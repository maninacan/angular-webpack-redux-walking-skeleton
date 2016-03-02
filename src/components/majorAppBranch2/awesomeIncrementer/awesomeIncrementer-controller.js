export default function awesomeIncrementerController() {
	const self = this;

	self.increment = increment;

	function increment() {
		self.onIncrement(self.incrementValue + 1);
	}
}
