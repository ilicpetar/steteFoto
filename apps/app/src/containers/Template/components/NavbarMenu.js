import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Menu, MenuItem } from '@gef-ui/components/organisms/Menu';
import { getLabelMessage } from '@gef-ui/localization/messages';

const NavbarMenu = (props) => {
	const dispatch = useDispatch();
	return (
		<Menu horizontal style={{ width: 'initial' }} {...props}>
			<MenuItem label={getLabelMessage('common:client')} onClick={(/* EVENT */) => dispatch(push('/client'))} />
		</Menu>
	);
};

export default NavbarMenu;
