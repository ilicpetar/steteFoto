import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import localization from 'localization/src';
import { urls } from 'constants/src';
import globalErrorHandler from '@gef-ui/error-handler/global/errorHandler';
import { initDefaultMessages, loadMessageResources } from '@gef-ui/localization/messages';
import createStore from './redux/createStore';
import App from './App';

import '../assets/scss/style.scss';

globalErrorHandler(true);
initDefaultMessages('cs');

loadMessageResources(localization);

const history = createBrowserHistory();

const initialState = {
	appContext: {},
	urls: urls(),
};

const store = createStore(initialState, history);

const rootElement = document.getElementById('root');

render(<App store={store} history={history} />, rootElement);
