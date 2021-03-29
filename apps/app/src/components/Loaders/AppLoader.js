import React from 'react';
import DashboardLoader from './DashboardLoader';
import PanelLoader from './PanelLoader';
import PanelContent from './PanelContent';

import './Loader.scss';

const AppLoader = () => (
	<div className="Loader">
		<DashboardLoader>
			<PanelLoader>
				<PanelContent />
			</PanelLoader>
		</DashboardLoader>
	</div>
);

export default AppLoader;
