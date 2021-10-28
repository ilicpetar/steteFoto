import React, { useState,useEffect,useRef,forwardRef,useImperativeHandle,useCallback } from "react";
import ImageUploader from "react-images-upload";
import Button from '@gef-ui/components/atoms/Button';	
import { useDispatch } from 'react-redux';
import { getData } from '@gef-ui/middleware-api/facade';
import axios from 'axios';
import ApiService from "../services/apiService";
import * as config from "../services/config";
import { hide, show, showAndHide, updateDescription } from '@gef-ui/features/modalLoader/actions';
import { prop } from "ramda";

 const Images = forwardRef((props,ref) => {


  const [isLoading, setIsLoading] = useState(false);
  const [pictures, setPictures] = useState([]);

  const dispatch = useDispatch();
  const pictureElement = useRef(null);

  
  const onDrop = (picture) => {
    setPictures([...pictures, picture])  
  };


  const handleUpload=()=>{
    
    if (props.brStete == '') {
      props.notify('Niste izabrali štetu za snimanje slike!', 'error');
      return;
    }
    if (pictures.length < 1) {
      props.notify('Niste izabrali nijednu sliku!', 'error');
      return;
    }
    dispatch(show());  
    setIsLoading(true);

    let picturesFiles=pictures[pictures.length-1]

    let data=new FormData();
    for (var i = 0; i < picturesFiles.length; i++) {
      // var file = pictures[0][i]; //ovako bilo
      var file = picturesFiles[i];   
      // Add the file to the request.
     data.append('files', file); 
    }

    //console.log(data.files);
    //axios.post(`https://t-ws.generali.rs:20044/api/File/Uplouds?copyTo=${props.copyTo}`,data).then(res=>res.data).catch(err=>console.log(err));

    

    // radi

    // setPictures([]);
    

    axios.post(`${config.APIENDPOINT}/File/DamageUplouds?brStete=${props.brStete}`,data,{
      headers: {
          "Content-Type": "multipart/form-data"
      }
      }).then(res=>{
        onClearImages();
        // setPictures([]);
        
        setIsLoading(false);
        ApiService.GetDamageImages(props.brStete)
        .then((res) => {
          props.onImages(res.data);
          dispatch(hide());
        })
        .catch((err) => {props.notify('Doslo je do greske pri ucitavanju slika', 'error');dispatch(hide());}); 
      })
      .catch(err=>{props.notify('Doslo je do greske pri uploudu slika', 'error');setIsLoading(false);dispatch(hide());onClearImages();}); 

     
  }

  const handlePDF = () =>{
    if (props.brStete == '') {
      props.notify('Niste izabrali štetu za kreiranje PDF-a!', 'error');
      return;
    }
    dispatch(show());
    try {
    ApiService.PostImagesToPDF(props.brStete,333)
    .then(res=>{
      ApiService.GetDamageArchiveLinks(props.brStete)
			.then((res) => {
				props.onDocuments(res.data);
        dispatch(hide());
			})
			.catch((err) => {dispatch(hide());props.notify('Doslo je greske pri ucitavanju arhive dokumentacije', 'error');});
    })
    .catch(err=>{dispatch(hide());props.notify('Doslo je greske pri kreiranju PDF-a', 'error');});
    }catch (e) {
			
			dispatch(hide());
			props.notify('Doslo je do greske prilikom kreiranja PDF-a - fatal error', 'error');
    }
  }

  const onClearImages= () => {
    pictureElement.current.clearPictures(); 
    pictureElement.current.state.pictures = [];
    pictureElement.current.state.files = [];  
    setPictures([]); 
  }

  useImperativeHandle(
    ref,
    () =>({getClearImages(){
      onClearImages();
      // setPictures([]);
      setIsLoading(false);
    }
    })
  );

  return (
  
    <div className="container">
    <ImageUploader
      {...props}
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif",".jpeg"]}
      maxFileSize={7242880}
      withPreview={true}
      label={'Prihvatljivi formati slike su : jpg | jpeg | png | gif'}
      buttonText={'Odaberite slike'}
      ref={pictureElement}
    />
    <div align="right">
    <Button label="Snimi slike" primary onClick={handleUpload}/>&nbsp;
    <Button label="Kreiraj PDF" align="right" primary onClick={handlePDF}/>
     </div>     
    </div>

    
  );  
}); 

export default Images;