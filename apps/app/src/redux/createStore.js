import { createStore, applyMiddleware as reduxApplyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { batchDispatchMiddleware } from 'redux-batched-actions';
import { routerMiddleware } from 'connected-react-router';
import { isDev } from 'utils/src';
import createLogger, { LogLevel } from '@gef-ui/logging';
import { valveMiddleware } from '@gef-ui/middleware-api/middleware/valve';
import { cacheMiddleware } from '@gef-ui/middleware-api/middleware/cache';
import { statusMiddleware } from '@gef-ui/middleware-api/middleware/status';
import { reactiveApiMiddleware } from '@gef-ui/middleware-api/middleware/reactiveApi';
import rootReducer from './rootReducer';
import appName from '../constants/appName';

const loggingMiddleware = createLogger({
	level: LogLevel.DEBUG,
	name: appName,
	collapsed: true,
});

const createMiddlewares = (history) => [
	batchDispatchMiddleware,
	routerMiddleware(history),
	valveMiddleware(),
	cacheMiddleware(),
	statusMiddleware(),
	reactiveApiMiddleware(),
	thunk,
	loggingMiddleware,
];

const applyMiddleware = (middlewares) => {
	if (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
		return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(reduxApplyMiddleware(...middlewares));
	}

	return reduxApplyMiddleware(...middlewares);
};

export default (initialState, history) => {
	const store = createStore(rootReducer(history), initialState, applyMiddleware(createMiddlewares(history)));

	if (module.hot) {
		module.hot.accept('./rootReducer', () => {
			const nextRootReducer = require('./rootReducer');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};
