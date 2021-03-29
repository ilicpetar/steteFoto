// eslint-disable-next-line babel/new-cap
const router = require('express').Router();
const { forEach } = require('ramda');

forEach(({ path, handlerFn }) => router.all(path, handlerFn), [
	{
		path: '/',
		handlerFn(req, res) {
			setTimeout(() => res.send('Fake service called OK.'), 2000);
		},
	},
]);

module.exports = router;
