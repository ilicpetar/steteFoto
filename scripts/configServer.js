const startServer = require('@gef-ui/gef-scripts/devServer/startServer');
const { fakeService } = require('./routes');

(() => {
	startServer([
		{
			name: '/rest/fakeService',
			route: fakeService,
		},
	]);
})();
