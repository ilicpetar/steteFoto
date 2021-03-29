import React from 'react';
import Panel from '@gef-ui/components/organisms/Panel';
import { getLabelMessage } from '@gef-ui/localization/messages';

const NotFoundPage = () => (
	<Panel heading={getLabelMessage('pages:notFound')}>
		<h3 className="Subheader-heading">{getLabelMessage('common:notFound')}</h3>
	</Panel>
);

export default NotFoundPage;
