import React, { useState,useEffect } from "react";
import ImageUploader from "react-images-upload";
import Button from '@gef-ui/components/atoms/Button';	
import { useDispatch } from 'react-redux';
import { getData } from '@gef-ui/middleware-api/facade';
import axios from 'axios';



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

    // setIsLoading(true);
    // let data=new FormData();
    // for (var i = 0; i < pictures[0].length; i++) {
    //   var file = pictures[0][i];    
    //   // Add the file to the request.
    //  data.append('files', file);
    //  //console.log(file);
    // }
    // //console.log(data.files);
    // axios.post(`https://t-ws.generali.rs:20044/api/File/Uplouds?copyTo=${props.copyTo}`,data).then(res=>res.data).catch(err=>console.log(err));
    // console.log(data);
    // setIsLoading(false)
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