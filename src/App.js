// import logo from './logo.svg';
// import './App.css';
// import React, { Component, useState } from 'react';
// import axios from 'axios';
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Link
// // } from 'react-router-dom';

// function App() {

//   const [transactionId, settransactionId] = useState([]);
//   const [ledger, setledger] = useState([]);
//   const [operation_count, setoc] = useState([]);

//   // const [homeData, sethomeData] = useState({ 
//   //   //set: true,
//   //   // transactionId:[], //
//   //   ledger: [],
//   //   txTimestamp: [],  
//   //   // showMain: false,
//   //   // addrees: '',
//   //   // private: ''
//   // }
//   // )

//   const loadData = () => {
//     var serverPost = "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/TransactionsAll";
//     axios.get(serverPost).then(response => {
//       // console.log("result", response.data.length)
//       for (var i = 0; i < response.data.length; i++) {
//         // homeData.transactionId.push(response.data[i].id)
//         settransactionId( transactionId => [...transactionId, response.data[i].id]);
//         setledger( ledger => [...ledger, response.data[i].ledger]);
//         setoc( operation_count => [...operation_count, response.data[i].operation_count]);
//         // settransactionId([...transactionId, response.data[i].id]);
//       }

//     })
//   }
// // console.log(ledger)
//   // const transactionDetails = (e) => {
//   //   var serverPost = "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/TransactionsAll";
//   //   axios.get(serverPost).then(response => {
//   //     // console.log("result", response.data.length)
//   //     for (var i = 0; i < response.data.length; i++) {
//   //       // homeData.transactionId.push(response.data[i].id)
//   //       settransactionId( transactionId => [...transactionId, response.data[i].id]);
//   //       // settransactionId([...transactionId, response.data[i].id]);
//   //     }

//   //   })
//   // }
 
//   React.useEffect(() => {
//     loadData();
//   },[]);

//   const home = (
//     <div>

  
//     <div className="p-3 mb-2 bg-primary text-white" style={{ textAlign: 'center' }}>
//       <h1>Diamante Blockchain Explorer</h1>
//     </div>
//     <br></br>
//     <div className='container'>
//       <input class="form-control" type="text" placeholder="tx hash/Address/ledger" aria-label="Search"></input>
//     </div>
//     <div>

//     </div>
//     <br></br>
//     <br></br>
//    <div className='container'>
//    <div class="card">
//     {/* <div class="row"> */}
//       <div  style={{ 'borderStyle': 'initial' }}>
//         <div>
//           <table class="table">
//             <thead>
//               <tr>
//                 <th style={{textAlign:'center'}}  >Transaction ID</th>
//                 <th >Ledger</th>
//                 <th >Operation count</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
              
//                 <td style={{textAlign:'center'}}>{transactionId[0]}</td>
//                 <td style={{textAlign:'center'}}>  {ledger[0]}</td>
//                 <td style={{textAlign:'center'}}>{operation_count[0]}</td>
//               </tr>
//               {/* <tr>

//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[1]]} state2={"TransactionOfHash"}>{this.state.transactionID[1]}</Link> </td>
//                 <td>{this.state.ledger[1]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[1]}</td>
//               </tr>
//               <tr>
//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[2]]} state2={"TransactionOfHash"}>{this.state.transactionID[2]}</Link> </td>
//                 <td>{this.state.ledger[2]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[2]}</td>
//               </tr>
//               <tr>

//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[3]]} state2={"TransactionOfHash"}>{this.state.transactionID[3]}</Link> </td>
//                 <td>{this.state.ledger[3]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[3]}</td>
//               </tr>
//               <tr>

//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[4]]} state2={"TransactionOfHash"}>{this.state.transactionID[4]}</Link> </td>
//                 <td>{this.state.ledger[4]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[4]}</td>
//               </tr>
//               <tr>

//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[5]]} state2={"TransactionOfHash"}>{this.state.transactionID[5]}</Link> </td>
//                 <td>{this.state.ledger[5]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[5]}</td>
//               </tr>
//               <tr>

//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[6]]} state2={"TransactionOfHash"}>{this.state.transactionID[6]}</Link> </td>
//                 <td>{this.state.ledger[6]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[6]}</td>
//               </tr>
//               <tr>

//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[7]]} state2={"TransactionOfHash"}>{this.state.transactionID[7]}</Link> </td>
//                 <td>{this.state.ledger[7]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[7]}</td>
//               </tr>
//               <tr>

//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[8]]} state2={"TransactionOfHash"}>{this.state.transactionID[8]}</Link> </td>
//                 <td>{this.state.ledger[8]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[8]}</td>
//               </tr>
//               <tr>

//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[9]]} state2={"TransactionOfHash"}>{this.state.transactionID[9]}</Link> </td>
//                 <td>{this.state.ledger[9]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[9]}</td>
//               </tr>
//               <tr>

//               <td style={{textAlign:'center'}}>   <Link to="/about" state={["TransactionOfHash",this.state.transactionID[10]]} state2={"TransactionOfHash"}>{this.state.transactionID[10]}</Link> </td>
//                 <td>{this.state.ledger[10]}</td>
//                 <td style={{textAlign:'center'}}>{this.state.operation[10]}</td>
//               </tr>
//           */}

//             </tbody>
//           </table>
//         </div>
//       </div>

  
//     </div>
//     </div>

     
  


//      {/* <div className="App">

// </div> */}
// </div>
//   )

//   return ( 
//     <div>
//    {home}
//     </div>
//   )


// }
// export default App;
////////////////////////////////////////////////////////////////////////////////////////////////
import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './component/Home';
// import About from './component/About';
import AboutT from './component/AboutTran';
import AboutL from './component/AboutLed';
import AboutA from './component/AboutAcc';
import NotFound from './component/nf';




class App extends Component {
  // componentWillMount() {
  //   this.chainData()
  // }

  // async chainData() {
  //   var serverPost = "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/TransactionsAll";
  //       axios.get(serverPost).then(response => {
  //         // console.log("result", response.data.length)
  //         for (var i = 0; i < response.data.length; i++) {
  //           this.setState({ transactionID : [...this.state.transactionID, response.data[i].id ]})
  //           this.setState({ ledger : [...this.state.ledger, response.data[i].ledger ]})
  //           this.setState({ operation : [...this.state.operation, response.data[i].operation_count ]})
  //         }
  //       })
  // }

  // constructor(props){
  //   super(props)
  //   this.state = { transactionID:[],
  //      ledger:[],
  //      operation:[]
  //   }
  // }

  // Loadable = componentStr =>
  // ReactLoadable({
  //   loader: () => import(`./components/${componentStr}`),
  //   loading() {
  //     return <Spinner />
  //   },
  // })

  render() {
    return (
      
      <Router>
        <div to="/"></div> 
<Routes>
    <Route exact path='/' element={< Home />}></Route>
    <Route exact path='/aboutTran/:id' element={< AboutT />}></Route>
    <Route exact path='/aboutled/:id' element={< AboutL />}></Route>
    <Route exact path='/aboutAcc/:id' element={< AboutA />}></Route>
    <Route exact path='/notfound' element={< NotFound />}></Route>
</Routes>
     
       </Router> 
//       <div>
// <p>cal{this.state.transactionID}</p>
//       </div>
      
    
       
    );
  }
}


export default App;
