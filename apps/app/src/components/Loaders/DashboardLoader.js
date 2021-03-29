import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from '@gef-ui/components/templates/Dashboard';

const sideBarMenuLoader = (
	<ul>
		<li>
			<div className="Loader-navigation">
				<div className="Loader-navigation-icon" />
				<div className="Loader-navigation-label" />
			</div>
		</li>
		<li>
			<div className="Loader-navigation">
				<div className="Loader-navigation-icon" />
				<div className="Loader-navigation-label" />
			</div>
		</li>
	</ul>
);

const logoElementLoader = (
	<div className="Loader-navigation">
		<div className="Loader-navigation-burger" />
		<div className="Loader-navigation-logo" />
	</div>
);

const DashboardLoader = ({ children }) => (
	<Dashboard
		sidebarMenuElement={sideBarMenuLoader}
		navbarMenuElement={<div />}
		navbarDropdownListElement={<div />}
		logoElement={logoElementLoader}
		username="User"
	>
		{children}
	</Dashboard>
);

DashboardLoader.propTypes = {
	children: PropTypes.node,
};

export default DashboardLoader;
