import React, { useState,useEffect,useRef,forwardRef,useImperativeHandle } from "react";
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


  // useEffect(() => {
  //   console.log(pictures);
  // }, [pictures])

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [pictures, setPictures] = useState([]);

  const pictureElement = useRef(null);
  
  const onDrop = picture => {    
    setPictures([picture]);
    
  };

  const handleUpload=()=>{
    console.log('slike',pictures)
    console.log('slike od 0',pictures[0])
    dispatch(show());
    setIsLoading(true);

    let data=new FormData();
    for (var i = 0; i < pictures[0].length; i++) {
      var file = pictures[0][i];    
      // Add the file to the request.
     data.append('files', file);
     
      // console.log(file);
    }

    //console.log(data.files);
    //axios.post(`https://t-ws.generali.rs:20044/api/File/Uplouds?copyTo=${props.copyTo}`,data).then(res=>res.data).catch(err=>console.log(err));

    

    // radi

    axios.post(`${config.APIENDPOINT}/File/DamageUplouds?brStete=${props.brStete}`,data,{
      headers: {
          "Content-Type": "multipart/form-data"
      }
      }).then(res=>{
        onClearImages();
        setPictures([]);
        setIsLoading(false);
        ApiService.GetDamageImages(props.brStete)
        .then((res) => {
          props.onImages(res.data);
          dispatch(hide());
        })
        .catch((err) => {props.notify('Doslo je do greske pri ucitavanju slika', 'error');dispatch(hide());}); 
      })
      .catch(err=>{props.notify('Doslo je do greske pri uploudu slika', 'error');setIsLoading(false);dispatch(hide());}); 
  }

  const handlePDF = () =>{
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
  }

  useImperativeHandle(
    ref,
    () =>({getClearImages(){
      onClearImages();
      setPictures([]);
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
      ref={pictureElement}
    />
    <div align="right">
    <Button label="Upload" primary onClick={handleUpload}/>&nbsp;
    <Button label="Create PDF" align="right" primary onClick={handlePDF}/>
     </div>     
    </div>

    
  );  
});
export default Images;