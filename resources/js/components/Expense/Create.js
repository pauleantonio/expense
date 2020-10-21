import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Create extends React.Component {
    constructor(){
        super();
        this.state={
            title:"",
            description:"",
            amount:"",
            date:"",
        
        }
        this.onChange=this.onChange.bind(this);
    }
 

  
    onChange(e){
        this.setState({[e.target.name]:e.target.value});

    }

    componentDidMount(){
        var today = new Date();
        var d = String(today.getDate()).padStart(2, '0');
        var m = String(today.getMonth() + 1).padStart(2, '0'); 
        var y = today.getFullYear();
        this.setState({
            date:`${y}-${m}-${d}`
        })
    }


 
    create=(e)=>{
        e.preventDefault();

        return axios.post('api/expense/store',{
            title:this.state.title,
            amount:this.state.amount,
            description:this.state.description,
            date:this.state.date,
        }).then(res=>{
            this.setState({
                title:"",
                description:"",
                amount:"",
                date:"",
                
            });
            this.props.history.push('/', { expenses: res.data});
    
    
        }).catch(err=>{
            console.log(err)
        });
    }

    
    render(){
      
        return (
            <div className="bg-img">
                <div className="expenseform shadow-lg">
               
                   <div className="column ">
                    <div className="logintext ">Create</div>
                    <form>
                    <div className="form-group m-4">
                    <input type="hidden" name="csrf-token" value="{{{ csrf_token() }}}"></input>
                      <label htmlFor="Title " className="ml-2" >Title</label>
                      <input type="text" className="form-control" name="title" id="title"  placeholder="Enter your Title" onChange={this.onChange} value={this.state.title}></input>
                      <br></br>

                      <label htmlFor="description " className="ml-2" >Description</label>
                      <textarea className="form-control" name="description" id="description"  placeholder="Enter your Description" rows={4} onChange={this.onChange} value={this.state.description}></textarea>
                      {/* <input type="text" className="form-control" name="description" id="description"  placeholder="Enter your Description" onChange={this.onChange} value={this.state.description}></input> */}
                      <br></br>

                      <label htmlFor="amount" className="ml-2" >Amount</label>
                      <input type="number" className="form-control" name="amount" id="amount" placeholder="Enter the Amount" onChange={this.onChange} value={this.state.amount}></input>
                      <br></br>

                      <label htmlFor="date" className="ml-2" >Date</label>
                      <input type="date" className="form-control" name="date" id="date" placeholder="Enter the Amount" onChange={this.onChange} value={this.state.date}></input>
                      <br></br>

                      <button type="submit" className="btn btn-primary float-right mr-4" onClick={this.create} >Create</button>
                      <Link to="/"><button className="btn btn-primary float-right mr-4" >Back</button></Link>
                      
                     
                    </div>
              
                    </form>
               
                </div>

        
            </div>
              </div>
       
        );
    };

        
}

export default Create;