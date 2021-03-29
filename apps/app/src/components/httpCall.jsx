import React from 'react';  
import axios from 'axios';
class AxiosCalls extends Component {
    state = { 
        posts:[]
     }
     async compomentDidMount(){
        const {data: posts}=await axios.get("https://jsonplaceholder.typicode.com/post")
        this.setState({posts});
     }
    render() { 
        return (  

        );
    }
}
 
export default AxiosCalls;