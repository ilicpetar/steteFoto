import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ControlledDashboard } from '@gef-ui/components/templates/Dashboard';
import Panel from '@gef-ui/components/organisms/Panel';
import TextField from '@gef-ui/components/atoms/TextField';
import Checkbox from '@gef-ui/components/atoms/Checkbox';
import {
	Grid,
	GridAlignTypes,
	GridCol,
	GridColPosition,
	GridDisplaySizes,
	GridSpaceTypes,
} from '@gef-ui/components/organisms/Grid';
import { getData } from '@gef-ui/middleware-api/facade';
import Button from '@gef-ui/components/atoms/Button';
import Logo from './components/Logo';
import SidebarMenu from './components/SidebarMenu';
import DropdownList from './components/DropdownList';
import NavbarMenu from './components/NavbarMenu';
import ImageLoader from '../../components/images';
import ImageGallery from '../../components/ImageGallery';

//komntar
const LandingPage = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const inputRef = useRef(null);

	const [state, setState] = useState({
		brStete: '',
		vrstaOsiguranja: '',
		datumNastanka: '',
		datumPrijave: '',
		brObracunaStete: '',
		datumLikvidacije: '',
		brPolise: '',
		osiguranik: '',
		opis: '',
		opis2: '',
		docPath: '',
		error: false,
	});
	const [isChecked, setIsChecked] = useState(false);
	const handleCheckboxChange = (event) => {
		setIsChecked(event.target.checked);
	};

	function handleChange(e) {
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value,
		});
	}

	const validate = (input) => {
		setState({ error: false });
		const pattern = /[a-zA-Z]-\d+\/\d{4}/;
		if (!pattern.test(input)) {
			setState({ ...state, error: true });
		}
	};
	const handleApi = () => {
		validate(state.brStete);
		if (state.error) return inputRef.current.focus();

		//(getData({endpoint: "https://t-ws.generali.rs:5000/api/File/GetDamageById?brStete=AO-4251/2021"})).then((data) =>
		axios
			.get(`https://t-ws.generali.rs:5000/api/File/GetDamageById?brStete=${state.brStete}`)
			.then((res) => {
				//   console.log(res.data[0])
				//   console.log(res.data[0].brStete)

				setState({
					...state,
					brStete: res.data.brStete,
					vrstaOsiguranja: res.data.vrstaOsiguranja,
					datumNastanka: res.data.datumNastanka,
					datumPrijave: res.data.datumPrijave,
					brObracunaStete: res.data.brObracunaStete,
					datumLikvidacije: res.data.datumLikvidacije,
					brPolise: res.data.brPolise,
					osiguranik: res.data.osiguranik,
					opis1: res.data.opis1,
					opis2: res.data.opis2,
					docPath: res.data.docPath,
				});
			})
			.catch((err) => console.log(err));
		//   console.log(data.body)
	};

	return (
		<ControlledDashboard
			navbarMenuElement={<NavbarMenu />}
			navbarDropdownListElement={<DropdownList />}
			sidebarMenuElement={<SidebarMenu />}
			logoElement={<Logo />}
		>
			<Panel
				className="panel"
				highlighted="true"
				heading="AO FOTO"
				footerElement={<div>Generali Osiguranje Srbija</div>}
			>
				<Grid className="example-background">
					<GridCol sizeXS={4}>
						<TextField
							required
							autofocus
							validationText={state.error ? 'Unesite ispravan broj stete' : ''}
							controlClassName={state.error ? 'Input--typeError' : ''}
							validationClassName={state.error ? 'Validation--typeError' : ''}
							floatingLabelText="Broj štete"
							outline="true"
							name="brStete"
							value={state.brStete}
							onChange={handleChange}
							defaultValue=""
							ref={inputRef}
						/>
					</GridCol>
					<GridCol sizeXS={8}>
						<Button label="Traži" primary onClick={handleApi} />
					</GridCol>
					<GridCol sizeXS={3}>
						<TextField
							floatingLabelText="Broj polise"
							outline="true"
							name="brPolise"
							value={state.brPolise}
							onChange={handleChange}
						/>
					</GridCol>
					<GridCol sizeXS={3}>
						<TextField
							floatingLabelText="Vrsta osiguranja"
							outline="true"
							name="vrstaOsiguranja"
							value={state.vrstaOsiguranja}
							onChange={handleChange}
						/>
					</GridCol>
					<GridCol sizeXS={3}>
						<TextField
							floatingLabelText="Osiguranik"
							outline="true"
							name="osiguranik"
							value={state.osiguranik}
							onChange={handleChange}
						/>
					</GridCol>
					<GridCol sizeXS={3}>
						<TextField
							floatingLabelText="Broj obračuna štete"
							outline="true"
							name="brObracunaStete"
							value={state.brObracunaStete}
							onChange={handleChange}
						/>
					</GridCol>
					<GridCol sizeXS={3}>
						<TextField
							floatingLabelText="Datum prijave"
							outline="true"
							name="datumPrijave"
							value={state.datumPrijave}
							onChange={handleChange}
						/>
					</GridCol>
					<GridCol sizeXS={3}>
						<TextField
							floatingLabelText="Datum nastanka"
							outline="true"
							name="datumNastanka"
							value={state.datumNastanka}
							onChange={handleChange}
						/>
					</GridCol>
					<GridCol sizeXS={3}>
						<TextField
							floatingLabelText="Datum likvidacije"
							outline="true"
							name="datumLikvidacije"
							value={state.datumLikvidacije}
							onChange={handleChange}
						/>
					</GridCol>
					<GridCol sizeXS={3}>
						<Checkbox label="Rešena" name="resena" checked={isChecked} onChange={handleCheckboxChange} />
					</GridCol>
					<GridCol sizeXS={9}>
						<TextField
							floatingLabelText="Opis"
							outline="true"
							name="opis"
							value={state.opis}
							onChange={handleChange}
						/>
					</GridCol>
					<GridCol sizeXS={12}>
						<TextField
							floatingLabelText="Dodatni opis"
							outline="true"
							name="opis2"
							value={state.opis2}
							onChange={handleChange}
						/>
					</GridCol>
					{/* <GridCol sizeXS={4}>
		<TextField floatingLabelText="doc path" outline="true" name="docPath"  value={state.docPath} onChange={handleChange} />
		</GridCol> */}
					<GridCol sizeXS={12} className="m--lg">
						<ImageGallery />
					</GridCol>
					<GridCol sizeXS={12}>
						<ImageLoader copyTo={state.docPath} />
					</GridCol>
				</Grid>
			</Panel>
		</ControlledDashboard>
	);
};

LandingPage.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default LandingPage;
