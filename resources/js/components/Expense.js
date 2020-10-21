import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
class Expense extends React.Component {
    constructor(props){
        super(props);
        this.state={
            expenses:"",
            pageNumber:1,
            loading:true,
    
        }

        this.logout=this.logout.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
    }
    logout=(e)=>{
        e.preventDefault();
        return axios.post('api/logout').then(res=>{
            console.log('logout');
            this.props.tryLog();
        }).catch(err=>{
            console.log(err);
            this.props.tryLog();
        })
    }

 

    componentDidMount(){
     this.populatePage();
    
 
    }

    

    

    populatePage=()=>{
        return axios.get('api/expense',{headers:{
            "Content-Type":"application/json",
             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }}).then(res=>{
            this.setState({
                expenses:res.data,
                pageNumber:1,
                loading:false
            });
     
        }).catch(err=>{
            console.log(err);
        })
    }

    deleteItem=(e)=>{
        this.setState({
            loading:true
        })
        return axios.post(`api/expense/delete/${e}`,{headers:{
            "Content-Type":"application/json",
             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }}).then(res=>{
         
            this.populatePage();
        }).catch(err=>{
            console.log(err);
        })
    }

    

    


    handlePageClick=(e)=>{

        return axios.get(`api/expense?page=${e.selected+1}`,{headers:{
            "Content-Type":"application/json",
             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }}).then(res=>{
            this.setState({
                expenses:res.data,
                pageNumber:e.selected+1,
                loading:false
            });
   
        }).catch(err=>{
            console.log(err);
        })
    }

  
    render(){
      
        return (
            <div className="expenseform shadow-lg addScroll">
               
                <div className="row  align-items-baseline ">


                 <div className="col-sm-5"><div className="expensetext">Expense</div>
               
                </div>
                
                <div className="col-sm-5 d-flex">
                      <button className="btn btn-primary ml-4  " onClick={this.logout}>Logout</button>
                      <Link to={{
                          pathname:"/chart",  
                      }} >  <button className="btn btn-primary ml-2  " >Chart</button></Link>
                      <Link to={{
                          pathname:"/create-expense",  
                      }} >  <button className="btn btn-primary ml-2  pr-4" >Create</button></Link>
                </div>

             

               </div>

               <div className="mt-2 table-responsive-sm">
               {this.state.loading?
                <h1>Loading</h1>:

    <div className="table-responsive pr-sm-5 pl-sm-5" >
      <table className="table " >
        <thead className="thead-dark">
                        <tr>
                        <th>TITLE</th>
                        <th >EXPENSE</th>
                        <th >DATE</th>
                        <th >DESCRIPTION</th>
                        <th >ACTION</th>
                        </tr>
                </thead>
                       <tbody>
                    { this.state.expenses.data.map((expense,index) =>
                    <tr key={index}>
                        <td className="textoverflow">{expense.title}</td>
                        <td>PHP {expense.amount}</td>
                        <td>{expense.date}</td>
                        <td className="textoverflow">{expense.description}</td>
                        <td>
                            <button onClick={()=>this.deleteItem(expense.id)}  className="btn btn-primary ml-3 mb-3 " >delete</button>
                           <Link to={{
                               pathname:`edit-expense`,
                               search:`id=${expense.id}`,
                               state:{
                                   id:expense.id,
                                   title:expense.title,
                                   amount:expense.amount,
                                   description:expense.description,
                                   date:expense.date,
                               }
                           }}> <button className="btn btn-primary ml-3 mb-3 " >edit</button></Link>
                            </td>
                    </tr>
                )}
                        </tbody>
                </table>

                <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.expenses.last_page}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={this.handlePageClick}
          containerClassName={'paginationz'}
          activeClassName={'paginateActive'}
        />
                </div>
                
              

              
            
                }
               </div>
            </div>
        );
    };

        
}

export default Expense;