import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../../assets/images/generaliceskapojistovna-primary-logo.svg';

const Logo = ({ width, height, ...other }) => (
	<a href="#" {...other}>
		<img alt="Logo" title="Home" src={logo} width={width} height={height} />
	</a>
);

Logo.propTypes = {
	/**
	 * Definition of css height property
	 */
	height: PropTypes.number,
	/**
	 * Definition of css width property
	 */
	width: PropTypes.number,
};

Logo.defaultProps = {
	width: 172,
	height: 28,
};

export default Logo;
