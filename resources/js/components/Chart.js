import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Bar} from 'react-chartjs-2'
class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state={
           loading:true,
            chartData:{    
            labels:['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
            datasets:[
                {
                  label:'Expense',
                  data:[
                    0,0,0,0,0,0,0,0,0,0,0,0
                ]
                }
            ],
            
                    },
            sampleData:'',
            yearNow: new Date().getFullYear()
        }
        this.onChange=this.onChange.bind(this)

    }


 

    componentDidMount(){
        this.popChart();
   
    }

    

    

     popChart=()=>{
      
      
        return axios.post('api/expense/chartData',
        {
            yearNow:this.state.yearNow
        }).then(res=>{
            this.setState({
                sampleData:res.data
             
            });
            let zxc= {...this.state.chartData}
          
            this.state.chartData.labels.forEach((month,mkey)=>{
                this.state.sampleData.map((val,key)=>{
                    if(month==val.month){
                      zxc.datasets[0].data[mkey]=val.amount
                       
                    }
                })
            })
            console.log(zxc)
            this.setState({
                chartData:zxc,
                loading:false
            })
            
      
              
           
        }).catch(err=>{
            console.log(err);
        })
    }



    popChart2=(e)=>{
        this.setState({
            loading:true
        })
        e.preventDefault();
        this.setState({
            loading:true
        })
        return axios.post('api/expense/chartData',
        {
            yearNow:this.state.yearNow
        }).then(res=>{
            this.setState({
                sampleData:res.data
             
            });
            let zxc= {...this.state.chartData}
            zxc.datasets[0].data=[
                0,0,0,0,0,0,0,0,0,0,0,0
            ]
            this.state.chartData.labels.forEach((month,mkey)=>{
                this.state.sampleData.map((val,key)=>{
                    if(month==val.month){
                      zxc.datasets[0].data[mkey]=val.amount
                       
                    }
                })
            })
            console.log(zxc)
            this.setState({
                chartData:zxc,
                loading:false
            })
            
      
              
           
        }).catch(err=>{
            console.log(err);
        })
    }
    

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }



  
    render(){
      
        return (
            <div className="bg-img">
                <div className="expenseform shadow-lg addScroll">
                <div className="row m-5">
                
                    <div className="col-sm-2 mr-4">
                        <Link to={{
                                pathname:"/",  
                        }}>  
                        <button className="btn btn-primary ml-4  " >Back</button>
                        </Link>
                        
                        <form>
                        <div className="form-group ">

                            <label htmlFor="description " className="ml-2" >Year</label>
                            <input type="text" className="form-control p-4" name="yearNow" id="year"  placeholder="XXXX" onChange={this.onChange} value={this.state.yearNow}></input>
                            <br></br>  

                            
                            <button type="submit" className="btn btn-primary float-right mr-4" onClick={this.popChart2} >Change Year</button>
                            <br></br>  
                     
                        </div>

                        </form>
                    </div>
                    <div className="col-sm-8 ">
                      {
                          this.state.loading?
                            <p>Loading</p>
                          :
                          <Bar
                          data={this.state.chartData}
                          height={600}
                          width={1000}
                          options={{
                              maintainAspectRatio: false,
                              title:{
                                  display:true,
                                  text:this.state.yearNow,
                                  fontSize:35
                              }
                            }}
                          ></Bar>
                      }
                    </div>

                </div>
                </div>


            </div>
     
         ) }

        
}

export default Chart;