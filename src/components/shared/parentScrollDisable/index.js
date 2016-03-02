import $ from 'jquery';

export default angular
	.module('myApp.components.shared.parentScrollDisable', [])
	.directive('parentScrollDisable', () => {
		return {
			restrict: 'E',
			scope: {
				elementSelector: '@'
			},
			link: (scope) => {
				if (!scope.elementSelector) {
					throw Error('elementSelector must have a value');
				}

				/*eslint-disable */
				if ($){
					$(scope.elementSelector).on('DOMMouseScroll mousewheel', function (ev) {
						const $this = $(scope.elementSelector)[0],
							scrollTop = $this.scrollTop,
							scrollHeight = $this.scrollHeight,
							height = $this.clientHeight,
							delta = ev.originalEvent.wheelDelta,
							up = delta > 0;

						if (!up && -delta > scrollHeight - height - scrollTop - 10) {
							// Scrolling down, but this will take us past the bottom.
							$this.scrollTop = scrollHeight;
							return prevent(ev);
						} else if (up && delta > scrollTop) {
							// Scrolling up, but this will take us past the top.
							$this.scrollTop = 0;
							return prevent(ev);
						}

						/**
						 * Prevents a given event from propagating thereby disabling scrolling for any parents of an element
						 * @function prevent
						 * @param e
						 * @returns {boolean}
						 */
						function prevent(e) {
							e.stopPropagation();
							e.preventDefault();
							e.returnValue = false;
							return false;
						}
					});
				}
				/*eslint-enable */
			}
		};
	})
	.name;
