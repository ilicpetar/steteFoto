import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Panel from '@gef-ui/components/organisms/Panel';
import { getMessage } from '@gef-ui/localization/messages';
import { fakeServiceCall } from '../../features/fakeService/actions';

const FakeProduct = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fakeServiceCall());
	}, [dispatch]);
	return <Panel heading={getMessage('pages:product')} />;
};

export default FakeProduct;
