import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import ModalLoaderProvider from '@gef-ui/features/modalLoader/containers/ModalLoaderProvider';
import Toastr from '@gef-ui/toastr/containers/ReduxToastr';
import AppLoader from './components/Loaders/AppLoader';
import PanelLoader from './components/Loaders/PanelLoader';
import { Template } from './containers/Template';
import { Routes } from './routes';

const App = ({ store, history }) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Suspense fallback={<AppLoader />}>
				<Template>
					<ModalLoaderProvider />
					<Toastr />
					<Suspense fallback={<PanelLoader />}>
						<Routes />
					</Suspense>
				</Template>
			</Suspense>
		</ConnectedRouter>
	</Provider>
);

App.propTypes = {
	history: PropTypes.object,
	store: PropTypes.object,
};

export default hot(App);
