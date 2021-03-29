import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { getLabelMessage } from '@gef-ui/localization/messages';
import { Menu, MenuItem } from '@gef-ui/components/organisms/Menu';

const SidebarMenu = (props) => {
	const dispatch = useDispatch();
	const navigate = useCallback((path) => dispatch(push(path)), [dispatch]);
	return (
		<Menu {...props}>
			<MenuItem label={getLabelMessage('pages:dashboard')} icon="home" onClick={(/* EVENT */) => navigate('/')} />
			<MenuItem
				label={getLabelMessage('pages:product')}
				icon="document"
				onClick={(/* EVENT */) => navigate('/fakeProduct')}
			/>
		</Menu>
	);
};

export default SidebarMenu;
