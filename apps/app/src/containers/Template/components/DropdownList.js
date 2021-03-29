import React from 'react';
import { getLabelMessage } from '@gef-ui/localization/messages';
import { ListBox, ListBoxItem } from '@gef-ui/components/organisms/ListBox';

const DropdownList = (props) => (
	<ListBox {...props}>
		<ListBoxItem>{getLabelMessage('common:account')}</ListBoxItem>
		<ListBoxItem>{getLabelMessage('common:logout')}</ListBoxItem>
	</ListBox>
);

export default DropdownList;
