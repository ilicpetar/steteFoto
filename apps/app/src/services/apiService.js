import axios from "axios";
import * as config from "./config";

class ApiService {
    static GetDamageById(brStete){
        return axios.get(`${config.APIENDPOINT}/File/GetDamageById?brStete=${brStete}`);
    }

    static GetDamageImages(brStete){
        return axios.get(`${config.APIENDPOINT}/File/DamageLinkFile?brstete=${brStete}&maxWidth=99999&maxHeight=1024`);
    }


    static GetDamageArchiveLink(brStete,fileID){
        return axios.get(`${config.APIENDPOINT}/File/GetDamageArchiveFile?brstete=${brStete}&fileID=${fileID}`);
    }

    static GetDamageArchiveLinks(brStete){
        return axios.get(`${config.APIENDPOINT}/File/GetDamageArchiveFile?brstete=${brStete}`);
    }

    static PostImagesToPDF(brStete,IDUser){
        return axios.post(`${config.APIENDPOINT}/File/ImagesToPdf?brStete=${brStete}&IDUser=${IDUser}`);
    }
    
    static PostDamageUploads(brStete,data){
        return axios.post(`${config.APIENDPOINT}/File/DamageUploud?brStete=${brStete}`,data,{
            headers: {
                "Content-Type": "multipart/form-data; charset=UTF-8"
            }
            });
    }
}

export default ApiService;