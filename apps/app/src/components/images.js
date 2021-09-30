import React, { useState,useEffect } from "react";
import ImageUploader from "react-images-upload";
import Button from '@gef-ui/components/atoms/Button';	
import { useDispatch } from 'react-redux';
import { getData } from '@gef-ui/middleware-api/facade';
import axios from 'axios';
import ApiService from "../services/apiService";
import * as config from "../services/config";




const Images = props => {


  useEffect(() => {
    console.log(pictures);
  }, [pictures])

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [pictures, setPictures] = useState([]);
  
  const onDrop = picture => {    
    setPictures([picture]);
    
  };

  const handleUpload=()=>{
    console.log(pictures);
    console.log(props.brStete);

    console.log(pictures[0][0]);

    setIsLoading(true);

    // // po seljacki

    // let data=new FormData();
    // var file = pictures[0][0];
    // data.append('file', file);



    // let formList = [];

    let data=new FormData();
    for (var i = 0; i < pictures[0].length; i++) {
      var file = pictures[0][i];    
      // Add the file to the request.
     data.append('files', file);
     //formList.push(data);
      console.log(file);
    }

  //   let data=new FormData();

  //   for (const key of Object.keys(pictures[0])) {
  //     console.log('key',key);
  //     console.log('file',pictures[0][key]);
  //     data.append('files', pictures[0][key])
  // }

    //console.log(data.files);
    //axios.post(`https://t-ws.generali.rs:20044/api/File/Uplouds?copyTo=${props.copyTo}`,data).then(res=>res.data).catch(err=>console.log(err));

    
    console.log('prepoziva formdata');
    console.log('data',data);


    // // radi

    axios.post(`${config.APIENDPOINT}/File/DamageUplouds?brStete=${props.brStete}`,data,{
      headers: {
          "Content-Type": "multipart/form-data"
      }
      }).then(res=>{console.log('api then',res);setIsLoading(false);})
      .catch(err=>{console.log('api err',err);setIsLoading(false)});

    


      // console.log(res.data.files);
      // console.log(res.data.form);
      // console.log(res.data.headers);
     

    console.log('data',props.brStete,data);
    //  ApiService.PostDamageUploads(props.brStete,data).then(res=>console.log('api then',res)).catch(err=>console.log('api err',err));
    
     
  }

  const handlePDF = () =>{

    ApiService.PostImagesToPDF(props.brStete)
    .then(res=>{console.log('api then pdf',res)})
    .catch(err=>{console.log('api err pdf',err)});
    
  }

  return (
  
    <div className="container">
    <ImageUploader
      {...props}
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={7242880}
      withPreview={true}
    />
    <div align="right">
    <Button label="Upload" primary onClick={handleUpload}/>&nbsp;
    <Button label="Create PDF" align="right" primary onClick={handlePDF}/>
     </div>     
    </div>

    
  );  
};
export default Images;