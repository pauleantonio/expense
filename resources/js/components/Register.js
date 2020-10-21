import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(){
        super();
        this.state={
            email:"",
            name:"",
            password:"",
            error:""
        }
        this.register=this.register.bind(this);
        this.back=this.back.bind(this);
        this.onChange=this.onChange.bind(this);
    }


    onChange(e){
        this.setState({[e.target.name]:e.target.value})
     }
   back(e){
    e.preventDefault();

    this.props.history.push("/");

   }
   register=(e)=>{
        e.preventDefault();
       
        return axios.post('api/register',{
           email:this.state.email, 
           name:this.state.name, 
           password:this.state.password, 
        }).then(res=>{
        
            this.setState({
                email:"",
                password:"",
                name:"",
            })
            console.log("Registered");
        
            this.props.history.push("/");
        }).catch(err=>{
            this.setState({
                error:err.response
            })
       
        })
     
    
    }

   componentDidMount(){
    console.log();
   }

   getAlertMessage(errors){
       if(!errors) return null
    
       return (
           <div className="error">
      {
         Object.entries(errors).map((item,key) => 
           <p key={key}>{`${item[0]}: ${item[1]}`}</p>
          )
      }
                  
          
           </div>
       )
   }
    render(){
       
         const message = this.state.error
            
         
        
        return (

                  <div className="loginform shadow-lg">
                <div className="column ">
                    <div className="logintext ">Register</div>
                    {this.getAlertMessage(message)}
                    <form noValidate>
                    <div className="form-group m-3">
                    <input type="hidden" name="csrf-token" value="{{{ csrf_token() }}}"></input>
                      <label htmlFor="email " className="ml-2" >Email</label>
                      <input type="email" className="form-control" name="email" id="email"  placeholder="Enter your email" onChange={this.onChange} value={this.state.email} required></input>
                    
                      <br></br>
                        
                        

                      <label htmlFor="email " className="ml-2" >Name</label>
                      <input type="text" className="form-control" name="name" id="name"  placeholder="Enter your name" onChange={this.onChange} value={this.state.name}></input>
                
                      <br></br>

                      <label htmlFor="pass" className="ml-2" >Password</label>
                      <input type="password" className="form-control" name="password" id="pass" placeholder="Enter your Password" onChange={this.onChange} value={this.state.password}></input>
                
                      <br></br>

                      <button type="submit" className="btn btn-primary float-right mr-4" onClick={this.register} >Register</button>
                  
                      <button className="btn btn-primary float-right mr-4" onClick={this.back} >Back</button>
                     
                    </div>
              
                    </form>
               
                </div>

            </div>
        
      
        );
    };

        
}

export default Register;