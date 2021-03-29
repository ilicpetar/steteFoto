import React from 'react';
import Panel from '@gef-ui/components/organisms/Panel';
import PanelContent from './PanelContent';

const headerLoader = <div className="Loader-section-title" />;

const PanelLoader = () => (
	<Panel headerElement={headerLoader}>
		<PanelContent />
	</Panel>
);

export default PanelLoader;
