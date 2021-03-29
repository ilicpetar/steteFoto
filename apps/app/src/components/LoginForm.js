import React from 'react';  

class LoginForm extends Component {
    render() { 
        const{account}=this.state;
         return ( 
         <div>
             <h1>Login Form</h1>
             <form onSubmit={this.hangeSubmit}>
                 <Input name="username"
                 value="{account.username}"
                 label="Username"
                 onChange={this.hangeChange}/>
              <Input name="password"
                 value="{account.password}"
                 label="Password"
                 onChange={this.hangeChange}/>
                 <button className="btn btn-primary">Submit</button>
                </form>
         </div>  );
      
    }
}
 
export default LoginForm;