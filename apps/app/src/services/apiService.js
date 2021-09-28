import axios from "axios";
import * as config from "./config";

class ApiService {
    static GetDamageById(brStete){
        return axios.get(`${config.APIENDPOINT}/File/GetDamageById?brStete=${brStete}`);
    }

    static GetDamageImages(brStete){
        return axios.get(`${config.APIENDPOINT}/File/DamageLinkFile?brstete=${brStete}&maxWidth=99999&maxHeight=1024`);
    }
}

export default ApiService;