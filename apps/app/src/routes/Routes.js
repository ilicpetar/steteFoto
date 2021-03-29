import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { isDev } from 'utils/src';
import appName from '../constants/appName';

export const appPath = isDev ? '' : `/${appName}/`;

const Dashboard = lazy(() => import(/* webpackChunkName: "landingPage" */ '../pages/Dashboard/Dashboard'));
const FakeProduct = lazy(() => import(/* webpackChunkName: "notFound" */ '../pages/FakeProduct/FakeProduct'));
const NotFound = lazy(() => import(/* webpackChunkName: "notFound" */ '../pages/NotFound/NotFound'));

const Routes = () => (
	<Switch>
		<Route exact path={`/${appPath}`} component={Dashboard} />
		<Route path={`/${appPath}fakeProduct`} component={FakeProduct} />
		<Route component={NotFound} />
	</Switch>
);

export default Routes;
