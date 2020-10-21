import React from 'react';
import Login from './Login'
import Expense from './Expense'
import axios from 'axios'


class Body extends React.Component {
    constructor(props){
        super(props);
        this.state={
            cookie:"",
            isLogged:false,
            isLoading:true
        }
    }
   UNSAFE_componentWillMount(){
    this.tryLog();
   
   }
   

    tryLog=()=>{

       return axios.post('api/isAuthenticated',{headers:{'Content-type':'application/json'}}).then(res=>{
     
     
        this.setState({
            isLogged:res.data.isAuthenticated,
            isLoading:false
        });
  
       }).catch(err=>{
           this.setState({
            isLogged:false,
            isLoading:false
           })
           console.log("Login or retry to login" );
       })
       
     
        
        
            }

    loading(){
        this.setState({
      
            isLoading:true
        });
    }


    render(){
  
        return (
         
        <div className="">
        {this.state.isLoading?
                <div className="loginform shadow-lg">
                <div className="column ">
                    <div className="logintext ">Loading</div>
                    
                </div>
                </div>
        
        
        :    this.state.isLogged?<Expense  tryLog={this.tryLog} rePop={ this.props.location}></Expense>:   <Login tryLog={this.tryLog} ></Login>}
     
     
        </div>
       
     
        );
    };

        
}

export default Body;

