import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Login extends React.Component {
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            error:""
        }
        this.getLoginCookie=this.getLoginCookie.bind(this);
        this.hello=this.hello.bind(this);
        this.onChange=this.onChange.bind(this);
    }


    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

   getLoginCookie=(e)=>{
        e.preventDefault();
       
        return axios.post('api/login',{
           email:this.state.email, 
           password:this.state.password, 
        },{headers:{
            "Content-Type":"application/json",
             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }}).then(res=>{
            this.setState({
                email:"",
                password:"",
            })
            
            this.props.tryLog();
        }).catch(err=>{
            this.setState({
                error:"Error! Wrong Email or Password",
                password:"",
            })
   
        })
     
    
    }

    hello = () => {
        this.props.login="Change"
    };


    getAlertMessage(errors){
        if(!errors) return null
     
        return (
            <div className="error m-4">
       {
         <p>{errors}</p>
       }
                   
           
            </div>
        )
    }

    render(){
        const message=this.state.error;
        return (
            <div className="loginform shadow-lg">
                <div className="column ">
                    <div className="logintext ">Login</div>
                    {this.getAlertMessage(message)}
                    <form>
                    <div className="form-group m-4">
                    <input type="hidden" name="csrf-token" value="{{{ csrf_token() }}}"></input>
                      <label htmlFor="email " className="ml-2" >Email</label>
                      <input type="email" className="form-control" name="email" id="email"  placeholder="Enter your email" onChange={this.onChange} value={this.state.email}></input>
                      <br></br>

                      <label htmlFor="pass" className="ml-2" >Password</label>
                      <input type="password" className="form-control" name="password" id="pass" placeholder="Enter your Password" onChange={this.onChange} value={this.state.password}></input>
                      <br></br>

                       <button type="submit" className="btn btn-primary float-right mr-4" onClick={this.getLoginCookie} >Login</button>
                       <Link to="/register">
                        <button className="btn btn-primary float-right mr-4">Register</button>

                       </Link>
                     
                    </div>
               
                    </form>
               
                </div>

            </div>
        );
    };

        
}

export default Login;