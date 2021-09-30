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
import { ListBox, ListBoxItem } from '@gef-ui/components/organisms/ListBox';
import { getData } from '@gef-ui/middleware-api/facade';
import Button from '@gef-ui/components/atoms/Button';
import Logo from './components/Logo';
import SidebarMenu from './components/SidebarMenu';
import DropdownList from './components/DropdownList';
import NavbarMenu from './components/NavbarMenu';
import ImageLoader from '../../components/images';
import ImageGallery from '../../components/ImageGallery';
import ApiService from '../../services/apiService';

// var documents = [
// 	'https://cdn.asp.events/CLIENT_ASP_Them_32933FC0_5056_B733_49552A1E34E6BB6F/sites/Bloom/media/libraries/brochures/D5816447-F237-DD89-067FA33B2930B2C8-document.pdf',
// 	'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/ddWinComicsPromo-2.jpg',
// 	'https://cdn.asp.events/CLIENT_ASP_Them_32933FC0_5056_B733_49552A1E34E6BB6F/sites/Bloom/media/libraries/brochures/D5816447-F237-DD89-067FA33B2930B2C8-document.pdf',
// 	'https://cdn.asp.events/CLIENT_ASP_Them_32933FC0_5056_B733_49552A1E34E6BB6F/sites/Bloom/media/libraries/brochures/D5816447-F237-DD89-067FA33B2930B2C8-document.pdf',
// 	'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/ddWinComicsPromo-2.jpg',
// 	'https://cdn.asp.events/CLIENT_ASP_Them_32933FC0_5056_B733_49552A1E34E6BB6F/sites/Bloom/media/libraries/brochures/D5816447-F237-DD89-067FA33B2930B2C8-document.pdf',
// ];

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
		images: [],
	});

	const [documents, setDocuments] = useState([]);
	const [stateImages, setStateImages] = useState([]);
	const [isChecked, setIsChecked] = useState(false);
	const handleCheckboxChange = (event) => {
		setIsChecked(event.target.checked);
	};

	function handleChange(e) {
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value,
			error: false,
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
		//axios
		//.get(`https://t-ws.generali.rs:20044/api/File/GetDamageById?brStete=${state.brStete}`)
		//.get(`https://t-ws.generali.rs/Api/QRcips/api/File/GetDamageById?brStete=${state.brStete}`)
		// getData({ endpoint: 'https://t-ws.generali.rs/Api/QRcips/api/File/GetDamageById?brStete=AO-4251/2021' })
		ApiService.GetDamageById(state.brStete)
			.then((res) => {
				setState({
					...state,
					brStete: res.data[0].brStete,
					vrstaOsiguranja: res.data[0].vrstaOsiguranja,
					datumNastanka: res.data[0].datumNastanka,
					datumPrijave: res.data[0].datumPrijave,
					brObracunaStete: res.data[0].brObracunaStete,
					datumLikvidacije: res.data[0].datumLikvidacije,
					brPolise: res.data[0].brPolise,
					osiguranik: res.data[0].osiguranik,
					opis1: res.data[0].opis1,
					opis2: res.data[0].opis2,
					docPath: res.data[0].docPath,
				});
			})
			.catch((err) => console.log(err));
		// axios
		// 	.get(
		// 		// `https://t-ws.generali.rs:20044/api/File/linktofile?brstete=AO-4251%2F2021&maxWidth=99999&maxHeight=1024`
		// 		`https://t-ws.generali.rs/Api/QRcips/api/File/DamageLinkFile?brstete=${state.brStete}&maxWidth=99999&maxHeight=1024`
		// 	)
		ApiService.GetDamageImages(state.brStete)
			.then((res) => {
				console.log(res);
				setStateImages(res.data);
			})
			.catch((err) => console.log(err));

		ApiService.GetDamageArchiveLinks(state.brStete)
			.then((res) => {
				console.log('documents api res', res);
				setDocuments(res.data);
				console.log('documents api', res.data);
			})
			.catch((err) => console.log('documents err', err));
	};
	// console.log('state', state);
	console.log('state img', stateImages);
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
					<GridCol sizeXS={12}>
						<h4>Arhiva dokumentacije</h4>
					</GridCol>
					{console.log('documents', documents)}
					{documents.map((d) => (
						<GridCol sizeXS={3}>
							<a
								href={`https://t-ws.generali.rs/Api/QRcips/api/File/GetDamageArchiveFile?brstete=${d.id}&fileID=${d.fileID}`}
								target="_blank"
							>
								{d.fname}
							</a>
						</GridCol>
					))}

					{/* <a
							href="https://cdn.asp.events/CLIENT_ASP_Them_32933FC0_5056_B733_49552A1E34E6BB6F/sites/Bloom/media/libraries/brochures/D5816447-F237-DD89-067FA33B2930B2C8-document.pdf"
							target="_blank"
						>
							SLIKA
						</a> */}

					<GridCol sizeXS={12} className="m--lg">
						<ImageGallery photos={stateImages} />
					</GridCol>
					<GridCol sizeXS={12}>
						<ImageLoader brStete={state.brStete} copyTo={state.docPath} />
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
