import React from 'react';
import { shallow } from 'enzyme';
import AppLoader from '../AppLoader';

describe('AppLoader', () => {
	it('should match snapshot', () => {
		expect(shallow(<AppLoader />)).toMatchSnapshot();
	});
});
