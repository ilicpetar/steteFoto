import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { ControlledDashboard } from '@gef-ui/components/templates/Dashboard';
import Panel from '@gef-ui/components/organisms/Panel';
import Logo from './components/Logo';
import SidebarMenu from './components/SidebarMenu';
import DropdownList from './components/DropdownList';
import NavbarMenu from './components/NavbarMenu';
import TextField from '@gef-ui/components/atoms/TextField';
import ImageLoader from '../../components/images';
import Checkbox from '@gef-ui/components/atoms/Checkbox';
import { Grid, GridAlignTypes, GridCol, GridColPosition, GridDisplaySizes, GridSpaceTypes } from '@gef-ui/components/organisms/Grid';
import { useDispatch } from 'react-redux';
import { getData } from '@gef-ui/middleware-api/facade';
import Button from '@gef-ui/components/atoms/Button';
import axios from 'axios';



const LandingPage = ({ children }) =>{
	const dispatch = useDispatch();
	const [state, setState] = useState({
		brStete: "",
		vrstaOsiguranja: "",
		datumNastanka:"",
		datumPrijave:"",
		brObracunaStete:"",
		datumLikvidacije:"",
		brPolise:"",
		osiguranik:"",
		opis:"",
		opis2:"",
		docPath:""
	
	  })
	  const [isChecked, setIsChecked] = useState(false);
	  const handleCheckboxChange = (event) => {
		setIsChecked(event.target.checked);
	  };

	  function handleChange(e) {
		const value = e.target.value
		setState({
		  ...state,
		  [e.target.name]: value
		});
	  }
	  const handleApi=()=>
	  {
		  //(getData({endpoint: "https://t-ws.generali.rs:5000/api/File/GetDamageById?brStete=AO-4251/2021"})).then((data) =>
		  axios.get(`https://t-ws.generali.rs:5000/api/File/GetDamageById?brStete=${state.brStete}`).then(res=>{			 
			//   console.log(res.data[0])
			//   console.log(res.data[0].brStete)

		  setState({
			...state,
			brStete:res.data.brStete,
			vrstaOsiguranja:res.data.vrstaOsiguranja,
			datumNastanka:res.data.datumNastanka,
			datumPrijave:res.data.datumPrijave,
			brObracunaStete:res.data.brObracunaStete,
			datumLikvidacije:res.data.datumLikvidacije,
			brPolise:res.data.brPolise,
			osiguranik:res.data.osiguranik,
			opis1:res.data.opis1,
			opis2:res.data.opis2,
			docPath:res.data.docPath	
		  })
		  
	  }
		  )		
		  .catch(err=>console.log(err));
		//   console.log(data.body)		  
	  }

	return (
 
	<ControlledDashboard
		navbarMenuElement={<NavbarMenu />}
		navbarDropdownListElement={<DropdownList />}
		sidebarMenuElement={<SidebarMenu />}
		logoElement={<Logo />}>
		<Panel className="panel" highlighted='true' heading='AO FOTO' footerElement={<div>Generali Osiguranje Srbija</div>}>
		<Grid className="example-background">
		<GridCol sizeXS={4}>
		<TextField  floatingLabelText="Broj štete" outline="true" name="brStete" value={state.brStete} onChange={handleChange} />	
		</GridCol>
		<GridCol sizeXS={8}>
		<Button label="Traži" primary onClick={handleApi}/>
		</GridCol>	
		<GridCol sizeXS={3}>
		<TextField floatingLabelText="Broj polise" outline="true" name="brPolise" value={state.brPolise} onChange={handleChange} />
		</GridCol>
		<GridCol sizeXS={3}>
		<TextField floatingLabelText="Vrsta osiguranja" outline="true" name="vrstaOsiguranja" value={state.vrstaOsiguranja} onChange={handleChange}  />
		</GridCol>
		<GridCol sizeXS={3}>
		<TextField floatingLabelText="Osiguranik" outline="true" name="osiguranik" value={state.osiguranik} onChange={handleChange} />
		</GridCol>
		<GridCol sizeXS={3}>
		<TextField floatingLabelText="Broj obračuna štete" outline="true" name="brObracunaStete" value={state.brObracunaStete} onChange={handleChange} />
		</GridCol>
		<GridCol sizeXS={3}>
		<TextField floatingLabelText="Datum prijave" outline="true" name="datumPrijave" value={state.datumPrijave} onChange={handleChange} />
		</GridCol>
		<GridCol sizeXS={3}>
		<TextField floatingLabelText="Datum nastanka" outline="true" name="datumNastanka" value={state.datumNastanka} onChange={handleChange} />
		</GridCol>		
		<GridCol sizeXS={3}>
		<TextField floatingLabelText="Datum likvidacije" outline="true" name="datumLikvidacije" value={state.datumLikvidacije} onChange={handleChange} />
		</GridCol>
		<GridCol sizeXS={3}>
		<Checkbox label="Rešena"  name="resena"  checked={isChecked} onChange={handleCheckboxChange}/>
		</GridCol>		
		<GridCol sizeXS={9}>
		<TextField floatingLabelText="Opis" outline="true" name="opis" value={state.opis} onChange={handleChange} />
		</GridCol>
		<GridCol sizeXS={12}>
		<TextField floatingLabelText="Dodatni opis" outline="true" name="opis2" value={state.opis2} onChange={handleChange} />
		</GridCol>
		{/* <GridCol sizeXS={4}>
		<TextField floatingLabelText="doc path" outline="true" name="docPath"  value={state.docPath} onChange={handleChange} />
		</GridCol> */}
	   </Grid>
		<ImageLoader copyTo={state.docPath}/>
     </Panel> 
	</ControlledDashboard>
)};

LandingPage.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default LandingPage;
