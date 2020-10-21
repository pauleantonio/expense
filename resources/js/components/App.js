import React from 'react';
import ReactDOM from 'react-dom';
import Body from './Body';
import Register from './Register';
import CreateExpense from './Expense/Create';
import EditExpense from './Expense/Edit';
import Chart from './Chart';
import {BrowserRouter as Router,Route} from 'react-router-dom';



class App extends React.Component {
    constructor(){
        super();
    }

    render(){
        return (
            <Router>
                <div className="bg-img">
                    <Route exact path="/" component={Body}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <Route exact path="/chart" component={Chart}></Route>
                    <Route exact path="/create-expense" component={CreateExpense}></Route>
                    <Route exact path="/edit-expense" component={EditExpense}></Route>
                </div>
            </Router>
      
        );
    };

        
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
