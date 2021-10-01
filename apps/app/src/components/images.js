import React, { useState,useEffect,useRef } from "react";
import ImageUploader from "react-images-upload";
import Button from '@gef-ui/components/atoms/Button';	
import { useDispatch } from 'react-redux';
import { getData } from '@gef-ui/middleware-api/facade';
import axios from 'axios';
import ApiService from "../services/apiService";
import * as config from "../services/config";
import { hide, show, showAndHide, updateDescription } from '@gef-ui/features/modalLoader/actions';




const Images = props => {


  useEffect(() => {
    console.log(pictures);
  }, [pictures])

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [pictures, setPictures] = useState([]);

  const pictureElement = useRef(null);
  
  const onDrop = picture => {    
    setPictures([picture]);
    
  };

  const handleUpload=()=>{
    dispatch(show());
    console.log(pictures);
    console.log(props.brStete);

    console.log(pictures[0][0]);

    setIsLoading(true);

    // // po seljacki

    // let data=new FormData();
    // var file = pictures[0][0];
    // data.append('file', file);





    let data=new FormData();
    for (var i = 0; i < pictures[0].length; i++) {
      var file = pictures[0][i];    
      // Add the file to the request.
     data.append('files', file);
     
      console.log(file);
    }

    //console.log(data.files);
    //axios.post(`https://t-ws.generali.rs:20044/api/File/Uplouds?copyTo=${props.copyTo}`,data).then(res=>res.data).catch(err=>console.log(err));

    
    console.log('prepoziva formdata');
    console.log('data',data);


    // // radi

    axios.post(`${config.APIENDPOINT}/File/DamageUplouds?brStete=${props.brStete}`,data,{
      headers: {
          "Content-Type": "multipart/form-data"
      }
      }).then(res=>{
        console.log('api then',res);
        onClearImages();
        setPictures([]);
        setIsLoading(false);
        ApiService.GetDamageImages(props.brStete)
        .then((res) => {
          console.log('api then images',res);
          props.onImages(res.data);
          dispatch(hide());
        })
        .catch((err) => console.log(err)); 
      })
      .catch(err=>{console.log('api err',err);setIsLoading(false)});

    

    
     
  }

  const handlePDF = () =>{
    dispatch(show());
    ApiService.PostImagesToPDF(props.brStete)
    .then(res=>{
      console.log('api then pdf',res)

      ApiService.GetDamageArchiveLinks(props.brStete)
			.then((res) => {
				console.log('documents api res', res);
				props.onDocuments(res.data);
				console.log('documents api', res.data);
        dispatch(hide());
			})
			.catch((err) => console.log('documents err', err));
    })
    .catch(err=>{console.log('api err pdf',err)});

  }

  const onClearImages= () => {
    pictureElement.current.clearPictures();
  }

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
};
export default Images;