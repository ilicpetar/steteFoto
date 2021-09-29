import React, { useState,useEffect } from "react";
import ImageUploader from "react-images-upload";
import Button from '@gef-ui/components/atoms/Button';	
import { useDispatch } from 'react-redux';
import { getData } from '@gef-ui/middleware-api/facade';
import axios from 'axios';
import ApiService from "../services/apiService";




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

    // po seljacki

    let data=new FormData();
    var file = pictures[0][0];
    data.append('file', file);



    // let formList = [];

    // let data=new FormData();
    // for (var i = 0; i < pictures[0].length; i++) {
    //   var file = pictures[0][i];    
    //   // Add the file to the request.
    //  data.append('file', file);
    //  //formList.push(data);
    //   console.log(file);
    // }

  //   let data=new FormData();

  //   for (const key of Object.keys(pictures[0])) {
  //     console.log('key',key);
  //     console.log('file',pictures[0][key]);
  //     data.append('files', pictures[0][key])
  // }

    //console.log(data.files);
    //axios.post(`https://t-ws.generali.rs:20044/api/File/Uplouds?copyTo=${props.copyTo}`,data).then(res=>res.data).catch(err=>console.log(err));

    
    console.log('prepoziva');
    console.log('data',data);
    axios.post(`https://t-ws.generali.rs/Api/QRcips/api/File​/DamageUploud?brStete=${props.brStete}`,data,{
      headers: {
          "Content-Type": "multipart/form-data"
      }
      });

      // console.log(res.data.files);
      // console.log(res.data.form);
      // console.log(res.data.headers);
     

    console.log('data',props.brStete,data);
    // "ApiService.PostDamageUploads(props.brStete,data).then(res=>console.log('api then',res)).catch(err=>console.log('api err',err));
    
     setIsLoading(false)
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
    <Button label="Create PDF" align="right" primary onClick={handleUpload}/>
     </div>     
    </div>
  );  
};
export default Images;