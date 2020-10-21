import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Edit extends React.Component {
    constructor(){
        super();
        this.state={
            id:"",
            title:"",
            description:"",
            amount:"",
            date:"",
            error:""
        }
        this.onChange=this.onChange.bind(this);
    }
 

  
    onChange(e){
        this.setState({[e.target.name]:e.target.value});

    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        return axios.get(`api/expense/show/${query.get(`id`)}`).then(res=>{
            this.setState({
                id:res.data.id,
                title:res.data.title,
                description:res.data.description,
                amount:res.data.amount,
                date:res.data.date,
            

            })
        }).catch(err=>{
            console.log('error')
        })
    }



 
    create=(e)=>{
        e.preventDefault();

        return axios.put(`api/expense/update/${this.state.id}`,{
            title:this.state.title,
            amount:this.state.amount,
            date:this.state.date,
            description:this.state.description,
        }).then(res=>{
            this.setState({
                title:"",
                description:"",
                amount:"",
                date:"",
            });
            this.props.history.push('/');
    
    
        }).catch(err=>{
            this.setState({
                error:err.response.data
            });
        });
    }
    getAlertMessage(errors){
        if(!errors) return null
      
     
        return (
            <div className="error column">
       {
        
             Object.entries(errors).map((item,key) => 
            
            <p key={key}>{`${item[1]}`}</p>
           )
           
       }
                   
           
            </div>
        )
    }
    
    render(){
        const message=this.state.error;
        return (
            <div className="bg-img">
                <div className="expenseform shadow-lg">
               
                   <div className="column ">
                    <div className="logintext ">Edit</div>
                    {this.getAlertMessage(message)}
                    <form>
                    <div className="form-group m-4">
                    <input type="hidden" name="csrf-token" value="{{{ csrf_token() }}}"></input>
                      <label htmlFor="Title " className="ml-2" >Title</label>
                      <input required type="text" className="form-control" name="title" id="title"  placeholder="Enter your Title" onChange={this.onChange} value={this.state.title}></input>
                      <br></br>

                      <label htmlFor="description " className="ml-2" >Description</label>
                      <input type="text" className="form-control" name="description" id="description"  placeholder="Enter your Description" onChange={this.onChange} value={this.state.description}></input>
                      <br></br>

                      <label htmlFor="amount" className="ml-2" >Amount</label>
                      <input type="number" className="form-control" name="amount" id="amount" placeholder="Enter the Amount" onChange={this.onChange} value={this.state.amount}></input>
                      <br></br>

                      <label htmlFor="date" className="ml-2" >Date</label>
                      <input type="date" className="form-control" name="date" id="date" placeholder="Enter the Amount" onChange={this.onChange} value={this.state.date}></input>
                      <br></br>

                      <button type="submit" className="btn btn-primary float-right mr-4" onClick={this.create} >Edit</button>
                      <Link to="/"><button className="btn btn-primary float-right mr-4" >Back</button></Link>
                      
                     
                    </div>
              
                    </form>
               
                </div>

        
            </div>
              </div>
       
        );
    };

        
}

export default Edit;