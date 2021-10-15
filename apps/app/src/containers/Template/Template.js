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
import { REDUCER_NAME } from '@gef-ui/features/modalLoader/constants';
import modalLoaderReducer from '@gef-ui/features/modalLoader/reducers/defaultReducer';
import ModalLoaderProvider from '@gef-ui/features/modalLoader/containers/ModalLoaderProvider';
import { hide, show, showAndHide, updateDescription } from '@gef-ui/features/modalLoader/actions';
// import Toastr, { Toast } from '@gef-ui/components/organisms/Toastr';
// import { Toast } from '@gef-ui/components/organisms/Toastr/Toast';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.scss';

// import { prefix } from './ModalLoader.routes';
// import mdx from './ModalLoader.mdx';

//komntar
const LandingPage = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const inputRef = useRef(null);
	const childRef = useRef();

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

	const resetState = () => {
		setState({
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
		setDocuments([]);
		setStateImages([]);
		setIsChecked(false);
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

	// const toast = () => {
	// 	<Toast id={'error'} key={'error'} renderIco message="This is toast" type={'error'} />;
	// };

	const notify = (message, type = 'info') => {
		console.log('toaster');
		// toast.warn('Warning Notification !', {
		// 	position: toast.POSITION.BOTTOM_LEFT,
		// });

		switch (type) {
			case 'info':
				toast.info(message, {
					position: toast.POSITION.TOP_LEFT,
				});
				break;
			case 'warn':
				toast.warn(message, {
					position: toast.POSITION.TOP_LEFT,
				});
				break;
			case 'error':
				toast.error(message, {
					position: toast.POSITION.TOP_LEFT,
				});
				break;
		}

		// return (
		//  <Toast id="xxx" renderIco message="This is timeout toast" type="error" timeout={50000} onClose={() => {}} />
		// );
	};

	const handleApi = async () => {
		childRef.current.getClearImages();
		setState({ brStete: inputRef.current.value });
		validate(state.brStete);
		notify('Pretraga stete', 'info');

		if (state.error) {
			return inputRef.current.focus();
		}

		dispatch(show());

		// ApiService.GetDamageById(state.brStete)
		// 	.then((res) => {
		// 		setState({
		// 			...state,
		// 			brStete: res.data[0].brStete,
		// 			vrstaOsiguranja: res.data[0].vrstaOsiguranja,
		// 			datumNastanka: res.data[0].datumNastanka,
		// 			datumPrijave: res.data[0].datumPrijave,
		// 			brObracunaStete: res.data[0].brObracunaStete,
		// 			datumLikvidacije: res.data[0].datumLikvidacije,
		// 			brPolise: res.data[0].brPolise,
		// 			osiguranik: res.data[0].osiguranik,
		// 			opis1: res.data[0].opis1,
		// 			opis2: res.data[0].opis2,
		// 			docPath: res.data[0].docPath,
		// 		});

		// 		dispatch(hide());
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		resetState();
		// 		dispatch(hide());
		// 	});

		// ApiService.GetDamageImages(state.brStete)
		// 	.then((res) => {
		// 		setStateImages(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		dispatch(hide());
		// 	});

		// ApiService.GetDamageArchiveLinks(state.brStete)
		// 	.then((res) => {
		// 		setDocuments(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		dispatch(hide());
		// 	});

		//AO-14438/2020
		try {
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
						brPolise: res.data[0].brpolise,
						osiguranik: res.data[0].osiguranik,
						opis1: res.data[0].opis1,
						opis2: res.data[0].opis2,
						docPath: res.data[0].docPath,
					});

					ApiService.GetDamageImages(state.brStete)
						.then((res) => {
							setStateImages(res.data);

							ApiService.GetDamageArchiveLinks(state.brStete)
								.then((res) => {
									setDocuments(res.data);
								})
								.catch((err) => {
									console.log(err);
									if (err.response.data === 'Fizički fajlovi ne postoje za ovu štetu.') {
										console.log('Posalji obavestenje');
									}
									setDocuments([]);
									dispatch(hide());
								});
						})
						.catch((err) => {
							if (err.response.data === 'Fizički fajlovi ne postoje za ovu štetu.') {
								console.log('Posalji obavestenje');
								setStateImages([]);

								ApiService.GetDamageArchiveLinks(state.brStete)
									.then((res) => {
										setDocuments(res.data);
									})
									.catch((err) => {
										console.log(err);
										if (err.response.data === 'Fizički fajlovi ne postoje za ovu štetu.') {
											console.log('Posalji obavestenje');
										}
										setDocuments([]);
										dispatch(hide());
									});
							}

							dispatch(hide());
						});
					dispatch(hide());
				})
				.catch((err) => {
					console.log(err);
					resetState();
					dispatch(hide());
				});
		} catch (e) {
			resetState();
			dispatch(hide());
		}

		// try {
		// 	console.log('print premise');
		// 	const [request2, request3] = await Promise.all([
		// 		ApiService.GetDamageById(state.brStete),
		// 		ApiService.GetDamageArchiveLinks(state.brStete),
		// 		ApiService.GetDamageImages(state.brStete),
		// 	]).catch((error) => {
		// 		console.log('error catch1', error.response);
		// 		if (error.response.data === 'Fizički fajlovi ne postoje za ovu štetu.') {
		// 			console.log('Posalji obavestenje');
		// 		}
		// 		setDocuments([]);
		// 		setStateImages([]);
		// 	});

		// setState({
		// 	...state,
		// 	brStete: request1.data[0].brStete,
		// 	vrstaOsiguranja: request1.data[0].vrstaOsiguranja,
		// 	datumNastanka: request1.data[0].datumNastanka,
		// 	datumPrijave: request1.data[0].datumPrijave,
		// 	brObracunaStete: request1.data[0].brObracunaStete,
		// 	datumLikvidacije: request1.data[0].datumLikvidacije,
		// 	brPolise: request1.data[0].brPolise,
		// 	osiguranik: request1.data[0].osiguranik,
		// 	opis1: request1.data[0].opis1,
		// 	opis2: request1.data[0].opis2,
		// 	docPath: request1.data[0].docPath,
		// });

		// 	setDocuments(request2.data);
		// 	setStateImages(request3.data);
		// 	dispatch(hide());
		// } catch (err) {
		// 	console.log('err promise', err);
		// 	dispatch(hide());
		// 	//setState({ error: true });
		// }
	};

	const onImages = (values) => {
		setStateImages(values);
	};

	const onDocuments = (values) => {
		setDocuments(values);
	};

	return (
		<>
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
							<Checkbox
								label="Rešena"
								name="resena"
								checked={isChecked}
								onChange={handleCheckboxChange}
							/>
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
						<GridCol sizeXS={12}>
							<h4>Arhiva dokumentacije</h4>
						</GridCol>

						{console.log('documents', documents)}
						{documents.map((d) => (
							// <GridCol sizeXS={3}>
							// 	<a
							// 		href={`https://t-ws.generali.rs/Api/QRcips/api/File/GetDamageArchiveFile?brstete=${d.id}&fileID=${d.fileID}`}
							// 		target="_blank"
							// 	>
							// 		{d.fname}
							// 	</a>
							// </GridCol>
							<GridCol sizeXS={4} className="ScrollStyle" style={{ padding: 0 }}>
								<ListBox>
									<ListBoxItem
										link={`https://t-ws.generali.rs/Api/QRcips/api/File/GetDamageArchiveFile?brstete=${d.id}&fileID=${d.fileID}`}
										target="_blank"
									>
										{d.fname}
									</ListBoxItem>
								</ListBox>
							</GridCol>
						))}

						<GridCol sizeXS={12} className="m--lg">
							<ImageGallery photos={stateImages} />
						</GridCol>
						<GridCol sizeXS={12}>
							<ImageLoader
								ref={childRef}
								brStete={state.brStete}
								copyTo={state.docPath}
								onImages={onImages}
								onDocuments={onDocuments}
							/>
						</GridCol>
					</Grid>
				</Panel>
			</ControlledDashboard>
			<ToastContainer />
			<ModalLoaderProvider />
		</>
	);
};

LandingPage.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default LandingPage;
