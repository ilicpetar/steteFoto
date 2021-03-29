import { combineReducers } from 'redux';
import { dummyReducer } from 'redux-cond-reducer';
import { connectRouter } from 'connected-react-router';
import appContextReducer from '@gef-ui/redux-common/reducers/appContext';
import modalLoaderReducer from '@gef-ui/features/modalLoader/reducers/defaultReducer';
import toastrReducer from '@gef-ui/toastr/reducers/toastrReducer';
import codelistReducer from '@gef-ui/codelist/reducer/codelistReducer';
import errorHandlerReducer from '@gef-ui/error-handler/reducers/errorHandlerReducer';
import cacheReducer from '@gef-ui/middleware-api/redux/cache/reducers';
import statusReducer from '@gef-ui/middleware-api/redux/status/reducers';
import { REDUCER_NAME as cacheReducerName } from '@gef-ui/middleware-api/redux/cache/constants';
import { REDUCER_NAME as statusReducerName } from '@gef-ui/middleware-api/redux/status/constants';

export const rootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		urls: dummyReducer,
		error: errorHandlerReducer,
		toastr: toastrReducer,
		modalLoader: modalLoaderReducer,
		appContext: appContextReducer,
		codelists: codelistReducer,
		[cacheReducerName]: cacheReducer,
		[statusReducerName]: statusReducer,
	});

export default rootReducer;
