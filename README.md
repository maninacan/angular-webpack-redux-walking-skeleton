# Running the project

To build your package using webpack:

	$ npm run wp

To run your server using the new build:

	$ npm start

You will need to have iron-node install for this to work or you can change the script to work with your preferred server.

Navigate to:

	localhost:3000

To customize these commands, check out the 'scripts' property in package.json.

# Redux, Angular and Webpack

### Angular
Angular is Angular, but it can be closer to Vanilla JS by applying a few techniques, most of which are condoned and encouraged by the Angular team.

Consider the following directory structure:

	// Project

	root
		|-src
			|-actions
			| |-actions.js
			|	|-actionTypes.js
			|-components
			|	|-index.js
			|	|-myComponent
			|		|-index.js
			|		|-myComponent-controller.js
			|		|-myComponent-service.js
			|		|-myComponent-template.html
			|		|-myComponent.scss
			|-reducers
			|	|-index.js
			| |-reducer.js
			|-styles
			|	|-app.scss
			|	|-reset.scss
			|	|-utilities.scss
			|-app.config.redux.js
			|-app.config.router.js
			|-app.js
			|-vendor.js


#### Isolate controllers and services
When building a service, factory, controller, etc. build it as a standalone function in its own file.

	// src/components/myComponent/myComponent-controller.js

	function myComponentController(someDependency) {
		someDependency.doSomething();
	}

#### Modules
Use ES2015 modules:

	export default function() {
		// Do stuff
	}

Applied to our controller:

	// src/components/myComponent/myComponent-controller.js

	export default function myComponentController(someDependency) {
		someDependency.doSomething();
	}


#### index.js files
Use index.js files to register your components.  Similar to the way index.html is by default the entry point to a website, index.js is recognized by ES2015 modules as the default entry point within a directory. Considering the above directory structure, an index.js file may look like this:

#### Creating your component
A component should be modular and decoupled from the code that consumes it.  So the focus will be to accomplish that (loose coupling and modular).  I like to make the distinction between smart components (those who are aware of and/or manipulate the state) and dumb components (components that are stateless).  To this end I like to consider how the human body functions.  There are various components that make up the body.  Each has it's own function and each has the ability to handle that function independent of anything outside of it with exception to those parts of it that connect it to the rest of the body.

Case and point: The arm is very complex and it is composed of sub-components (e.g. veins, skin, muscles, etc.).  For the most part, it takes care of itself.  It has cellular regeneration that occurs directly inside itself.  The skin on the arm continues to renew itself.  The structure of the arm is of course very much apart of the arm itself.

There are however things the arm can't do for itself.  It cannot clean the blood that flows through it, and it cannot replenish the oxygen in the blood.  It cannot consume it's own food and break it down into the essential nutrients.  To get what it needs, it must be connected to the body via it's 'API'...the vascular system.

To create this type of a system, we start with a component as shown here:

	// src/components/myComponent/index.js

	import angular from 'angular';
	import myComponentController from './myComponent-controller.js';
	import myComponentService from './myComponent-service.js';
	import template from './myComponent-template.html';

	export default angular
		.module('myApp.components.myComponent', [])
		.controller('myComponentController', myComponentController)
		.factory('myComponentService', myComponentService)
		.directive('myComponent', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {},
				template: template,
				bindToController: true,
				controller: 'myComponentController',
				controllerAs: 'mc' // This can be whatever you want it to be. Just know that you will prefix everything in your html that is bound to the controller with it.
			};
		})
		.name;

Notice that directives don't get their own special file like controllers and services do.  By doing it this way, we are drawing nearer to the much desired 'web component' way of doing things.  That is, an app is a component made of components.  Similar to the way everything is an object in Java, in a webapp everything would be a component.  Components are made up of sub-components, and sub-components are made up of more sub-components and so forth.  The angular directive piece of a component is what defines the component's interface with the outside environment.

Ideally, with the exception of the main 'app' component, evey component is stateless and only has concern for itself.  Each component should be created in such a way that it is possible to completely transport the code for the component to an isolated environment and it will function perfectly when the requirements of the component's api are provided.  A component should not borrow the scope of a parent, nor should it depend on anything outside of itself with exception to the items being bound via the component's api (everything defined on the scope property in the component's index.js as seen above).

So regarding the directive portion of the component... It defines the web component and it binds the controller to the template using the bindToController, controller, and controllerAs properties.  Hence the reason that a directive does not get it's own file.  It is the entryway into a component.

I think it's worth repeating that a component does not depend on anything outside of itself save those things bound to it via the api:

	// src/components/myComponent/index.js

	...
	replace: true,
	scope: {}, // <------  ***THIS THING RIGHT HERE***.
	template: template,
	bindToController: true,
	...

#### Register individual components to 'myApp.components'
Use another index.js in the more general "components" directory.  This will gather the contents of the individual component submodules and combine them into the "components" module.  Like so:

	// src/components/index.js
	import myComponent from './myComponent'

	export default angular
		.module('myApp.components', [
			myComponent
		])
		.name;

Notice how myComponent is imported using ES2015 module import and myComponent is then listed as a dependency of the 'myApp.components' module.  Also, notice the '.name;' that comes at the end of the chain.  This is the name of the module (i.e. 'myApp.components' and 'myApp.components.myComponent').  This string is what is being inserted into the array of dependencies for the module (e.g. myComponent in `angular.module('myApp.components', [ myComponent ])` ).

#### Register components to your app
After you aggregate your components via the index.js in your "components" directory, you can register them in your app.js file.  Example:

	...
	import components from './components';
	import './styles/app.scss';

	/**
	 * Standardize the browser environment with polyfills.
	 */
	stdEnv();

	/**
	 * Declare myApp module
	 */
	export default angular
		.module('myApp', [
			'ui.bootstrap',
			ngRedux,
			components,  // <-- components registered as submodules here
			router
		])
		.factory('apiRoot', apiRoot)
		.config(($httpProvider) => {
			'ngInject';

			$httpProvider.interceptors.push('apiRoot');
		})
		.config(routerConfig)
		.config(reduxConfig)
		.config(spinnersConfig)
		.name

#### Bottom line
The purpose for making modules and submodules of components is to maintain a true decoupling of components from the project.  This will encourage modularity and reuse over the project and keeps every component in a state where it is easy to move it and/or use it somewhere else.  Another benefit is that it keeps the component close to the location where it is registered without muddying the waters with 100+ lines of registrations.

### [Redux](http://redux.js.org)
Not to be confused with the Redux WordPress framework, Redux JS is a very lean set of tools for handling state in a simple and elegant way using actions and reducer functions.  The purpose for using redux is because it makes state predictable and debuggable.  Below I will describe how to set up redux in your angular project.

Redux can be configured in the app.js file, but I prefer to create my own file called app.config.redux.js, and it looks something like this:

	import createLogger from 'redux-logger';
	import * as Immutable from 'immutable';
	import thunk from 'redux-thunk';
	import reducers from './reducers';
	import { combineReducers } from 'redux';
	import ngReduxRouter from 'redux-ui-router';

	/**
	 * Set up redux logger
	 */
	const logger = createLogger({
		level: 'info',
		collapsed: true,
		stateTransformer: (state) => {
			var newState = {};
			for (var i of Object.keys(state)) {
				if (Immutable.Iterable.isIterable(state[i])) {
					newState[i] = state[i].toJS();
				} else {
					newState[i] = state[i];
				}
			}
			return newState;
		}
	});

	export default ($ngReduxProvider) => {
		'ngInject';

		let reducer = combineReducers({...reducers, ngReduxRouter});
		$ngReduxProvider.createStoreWith(reducer, [thunk, logger]);
	};

First, notice the imported dependencies.  The only necessary imports are the 'redux' and the './reducers' imports.  The rest are additional tools for making life easier.  So yes, redux is necessary and so are the reducers that we will create elsewhere in the project...in this case, at './reducers'.

Take a look at the following section:

	...

	export default ($ngReduxProvider) => {
		'ngInject';

		let reducer = combineReducers({...reducers, ngReduxRouter});
		$ngReduxProvider.createStoreWith(reducer, [thunk, logger]);
	};

Notice we are injecting $ngReduxProvider which is an object supplied by the ng-redux module which, as you will see below, is imported into app.js and added to the array of dependencies for 'myApp'.

Also, notice that the combineReducers method is called.  This is the part that takes all of the reducers that have been aggregated (and subsequently imported into app.config.redux.js) and combines them into a single reducer that maintains separation of the reducers by making them operate on separate branches within the same state object.  After they are combine, the new mega-reducer is passed into the createStoreWith function (where it is registered with Redux) as the first parameter .  The second parameter takes an array of middleware.  To be honest, I still haven't taken the time to find out what thunk does.  The logger, however, is handy because every time the state changes, it prints the previous state, the action performed, and the new state to the console.

Now that we have created the store, we can inject the state into whatever controller or service we want.  This will look something like the following:

	// src/components/myComponent/myComponent-controller.js

	import actions from '../../actions/actions';

	export default function myComponentController($ngRedux, $scope) {
		'ngInject';

		const self = this;

		let unSubscribe = $ngRedux.connect(onUpdate, actions)(self);
		$scope.$on('$destroy', unSubscribe);

		function onUpdate(state) {
			return {
				reducer: state.reducer
			};
		}

	}

The $ngRedux.connect function takes:
- a callback that is used to map properties on the state with a property that will be bound to the scope of the controller (or whatever object you choose to pass it).
- an array of the actions that are imported from the actions directory.
It then returns a function that, when called, binds the mapped state to an object that is passed in.  In our case, we are passing in 'self' which contains a reference to 'this'.  After it runs, we are now able to access the parts of the state that we mapped to 'self' simply by typing something like this:

	const myThing = self.somePropertyOfTheState;

I can also access the actions that were passed into the $ngRedux.connect function like this:

	self.setUser({
		userName: 'Jim Jimmy Jim Jim',
		sessionToken: '12r9sdf09u12rokjsdafu12r3oijqsdf09u21rpoij'
	});

That's pretty much it in a nutshell.  But wait, we still haven't defined the setUser function.  That is where actions and reducers come into play.

#### Actions and reducers
We need an 'actions' directory that contains an actionTypes.js file as well as at least one file for creating action functions.  Right now we have only one, and it is called 'actions.js';

In the 'reducers' directory we find an index.js which will be used for aggregating all of our reducer files.  Again, we only have one and it is called 'reducer.js'.

##### Actions
The 'actionTypes.js' file contains all of the actionTypes for the whole app.  My purpose for doing this is that I won't ever accidentally create the same actionType twice.  The file looks something like this:

	export const DATE_SELECTED = 'DATE_SELECTED';
	export const USER_SET = 'USER_SET';
	export const COUNT_INCREMENTED = 'COUNT_INCREMENTED';
	...

These types are now available to be injected into the reducer files and the action files as you will see below.

Now I will demonstrate how to make an action.  If I want to change a value on the state, say by calling the setUser function that we saw in the controller above, I can define said function like this:

	import { USER_SET } from './actionTypes';

	function setUser(user) {
		return {
			type: USER_SET,
			user: user
		};
	}

First I import the actionType for this particular action.  Next I define the function for the action.  It must always return an object that has a property called 'type'.  As you may have guessed, you assign the actionType to 'type'.  Whether or not you have more properties depends on what you are trying to accomplish with your action.  It's completely up to you.  Just remember though, that an action is supposed to perform one simple change to the state.  It is not meant to make categories of state changes.

As we saw above in our controller example, an action function is the function you will call when you want to change something on the state.  Once the action is called, it is the reducer's job to intercept that action and make the appropriate change to the state.

##### Reducers
The object returned by the setUser function is the "Action".  This action is passed into a reducer function that would look something like this:

	import deepFreeze from 'deep-freeze';
	import { USER_SET, COUNT_INCREMENTED } from './actionTypes';

	function theReducer(state, action) {
		// deepFreeze(state);
		switch (action.type) {
			case USER_SET:
				return {...state, user: action.user};  // First destructure the state into the new object. Then define the 'user' property.
			case COUNT_INCREMENTED:
				return {...state, count: state.count + 1};
			default:
				return state;
		}
	}
The reducer function takes the state and the action.  It then inspectes the action.type property using a switch statement and returns a new state with the appropriate change made.

Notice that the object returned by the reducer is a clone of the state, not the state itself.  The state object passed into the reducer function should not be manipulated in any way. Sometimes I will use the deepFreeze method to freeze the state just to be sure that I'm not directly manipulating the state.  This is imperitive for Redux to work as designed.  One of the benefits of redux is the ability that it gives the developer to go back in time on a break point while debugging.  The reason it is able to do this is because it maintains a snapshot of every change in the state.  This may seem like it would cause performance issues, but it is actually very efficient because when a new state is created, it creates only a shallow copy of everything on the old state except on the value/branch that is being changed.

Also, notice that "action" is the object that was returned by the action function that we called in the controller.  In the case of setting the user ( `self.setUser(userObject)` ), 'action' will look like this:

	{
		type: 'USER_SET',
		user: {
			userName: 'Jim Jimmy Jim Jim',
			sessionToken: '12r9sdf09u12rokjsdafu12r3oijqsdf09u21rpoij'
		}
	}

So 'type' is being used to determine where the switch statement should switch to, and 'user' is the object that will be set on the new state.user property.

### [Webpack](https://webpack.github.io/)
The reason I prefer Webpack over Grunt, Gulp, etc. is because of the brevity with which a build package can be created.  Here is an example webpack configuration for development:

	var Webpack = require('webpack');
	var path = require('path');

	// Plugins
	var CopyWebpackPlugin = require('copy-webpack-plugin');

	// Paths
	var nodeModulesPath = path.resolve(__dirname, 'node_modules');
	var buildPath = path.resolve(__dirname, 'public', 'build');
	var mainPath = path.resolve(__dirname, 'src', 'app.js');
	var vendorPath = path.resolve(__dirname, 'src', 'vendor.js');
	var testFiles = path.resolve(__dirname, 'src', 'components', '**', '*_test.js');

	var config = {
		// Makes sure errors in console map to the correct file
		// and line number
		devtool: 'source-map',
		entry: {
			// vendor: vendorPath,
			bundle: [
				// For hot style updates
				'webpack/hot/dev-server',

				// The script refreshing the browser on none hot updates
				'webpack-dev-server/client?http://localhost:8080',

				// Our application
				mainPath
			]
		},
		output: {

			// We need to give Webpack a path. It does not actually need it,
			// because files are kept in memory in webpack-dev-server, but an
			// error will occur if nothing is specified. We use the buildPath
			// as that points to where the files will eventually be bundled
			// in production
			path: buildPath,
			filename: '[name].js',

			// Everything related to Webpack should go through a build path,
			// localhost:3000/build. That makes proxying easier to handle
			publicPath: '/build/'
		},
		module: {
			loaders: [

				// I highly recommend using the babel-loader as it gives you
				// ES6/7 syntax and JSX transpiling out of the box
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: [nodeModulesPath, testFiles]
				},

				// Let us also add the style-loader and css-loader, which you can
				// expand with less-loader etc.
				{
					test: /\.scss$/,
					loaders: ['style', 'css', 'sass'],
					include: __dirname + '/src',
				},

				{
					test: /\.html$/,
					loader: 'raw'
				}
			]
		},
		sassLoader: {
			includePaths: [path.resolve(__dirname, "./src/styles")]
		},
		// We have to manually add the Hot Replacement plugin when running
		// from Node
		plugins: [
			new Webpack.HotModuleReplacementPlugin(),
			// Directories to be copied.  Only the bare necessities should be copied into the build.
			// uncomment to copy stuff when webpack builds
			// new CopyWebpackPlugin([{
			// 	from: './src/assets',
			// 	to: '../assets'
			// }])
		]
	};

	module.exports = config;

First, if you look at the 'devTool' property on the 'config' object, you will see that it is set to 'source-map'.  This is one of a number of options available.  A list of options and an explanation can be found [here](https://webpack.github.io/docs/configuration.html#devtool) along with the pros and cons of using each.

Webpack has a number of [loaders](https://webpack.github.io/docs/list-of-loaders.html) and [plugins](https://webpack.github.io/docs/list-of-plugins.html) that can be used to customize its behavior.


### [ES2015](http://babeljs.io/docs/learn-es2015/)
Using this structure I make heavy use of ES2015 (formerly ES6)...especially modules, which provide a new mechanism for dependency injection.

Here are some of the ES2015-specific features that I make use of:
#### spread operator

	const someVar = {
		thing1: 'thing 1',
		thing2: 'thing 2'
	};

	const newVar = { ...someVar } !== someVar;

	console.log(newVar); // returns { thing1: 'thing 1', thing2: 'thing2'}

The above example shows the destructuring of 'someVar' into a new object called newVar.  'newVar' does not contain a reference to 'someVar'.  However, 'newVar' has the same properties with the same values as 'someVar'.


#### object destructuring

	const { thing1, thing2, thing3 } = {
		thing1: 'Thing 1',
		thing2: 'Thing 2',
		thing3: 'Thing 3'
	};

	thing1 === 'Thing 1'

#### module *exports* and *imports*
##### export

	// ./some/file.js

	export default function someFunc() {
		// Stuff goes here
	}

##### import

	import thing from './some/file.js'

	thing === someFunc

#### *const* and *let* are the new *var*

	const thing = 'thing';

	thing = 'other thing';  // Throws an error. Constants can't be modified.

	let newThing = 'new thing';

	newThing = 'a different thing'; // Ok  :-)

So why use *let* at all and not *var*?  Because *let* follows different scoping rules.  ...I should say more intuitive scoping rules.
Basically anywhere you have block statements (places where curly brackets are used) variables defined using const and let now recognize scope within that block statement.  For example, if statements and for loops.

#### arrow functions

	function someFunc(msg) {
		console.log(msg);
	}

	someFunc('Fun in the sun.');

becomes

	const someFunc = msg => console.log(msg);

	someFunc('Fun in the sun.');

Arrow functions are fun and easy.
