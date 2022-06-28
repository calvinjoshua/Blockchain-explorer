import '../App.css';
import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';
  
  import { useLocation } from 'react-router-dom'


  function App() {
    let [hsh, sethsh] = React.useState();
    let [succ, setsucc] = React.useState();
    let [lgr, setlgr] = React.useState();
    let [ct, setct] = React.useState();
    let [sa, setsa] = React.useState();
    let [fc, setfc] = React.useState();
    let [oc, setoc] = React.useState();
    // let [showwht, setshowwht] = React.useState({
    //      h : '',
    //      l : '',
    //      a: ''
    // });
    // let [showtlgr, setshowlgr] = React.useState();
    // let [showtaccd, setshowaccd] = React.useState();
    // let [hsh, sethsh] = React.useState();
    // let [hsh, sethsh] = React.useState();
    // let [hsh, sethsh] = React.useState();
  
    const location = useLocation();
    // //     //  const from = location.state
    // //     //  const from = location.state "/TransactionOfHash/
    const type =  location.state[0];//"transactions"//
    const t = location.state[1];//"650670e09e564146a118eee35c530d325daa1f6292d62e53bcd570d70468bfbd"//
    // if(type === 'TransactionOfHash'){
    //   setshowwht({... showwht, h : true})
    // }
    // else if(type === "ledgerDetails"){
    //   setshowwht({... showwht, l : true})
    // }
    // else{
    //   setshowwht({... showwht, a : true})
    // }

    //console.log(showtshs)
    //     // const type2 = location.state
  
    const fetchData = () => {
      var serverPost =
        "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/"+type+"/"+t;
      axios.get(serverPost).then((response) => {
      //  console.log(response.data);
      //  setsucc(response.data.successful ? true : true)
      console.log(response.data.successful)
       let cs = response.data.successful.toString() //()
       console.log(cs)
       setsucc(cs);
        sethsh(response.data.hash );
        setlgr(response.data.ledger );
       
        setct(response.data.created_at );
        setsa(response.data.source_account );
        setfc(response.data.fee_charged );
        setoc(response.data.operation_count );
        console.log(succ)
        // setResponseData({ ...responseData, sc: response.data.successful });
        // setResponseData({ ...responseData, lgr: response.data.ledger });
        // setResponseData({ ...responseData, cat: response.data.created_at });
        //   formData.transactionId.push(response.data[i].id)
      });
    };
    //   axios({
    //     method: "GET",
    //     url:
    //       "https://horizon-testnet.stellar.org/transactions/650670e09e564146a118eee35c530d325daa1f6292d62e53bcd570d70468bfbd"
    //   })
    //     .then((response) => {
    //  
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });
  
    React.useEffect(() => {
      fetchData();
    },[]);
  
    const def = ( 
      <div>
        <p> Opps, Sorry</p>
      </div>
    )
    
    const thsh = (
        <div className="App">
        
          <div className="p-3 mb-2 bg-primary text-white" style={{ textAlign: 'center' }}>
                <h1>Diamante Blockchain Explorer</h1>
              </div>
              <br></br>
              <div className='container'>
                <input class="form-control" type="text" placeholder="tx hash/Address/ledger" aria-label="Search"></input>
              </div>
    <br></br>
  <div className='container'>
  <div class="card">
    <div class="card-body" style={{textAlign:'left'}}>
  
      Overview
    </div>
    <hr></hr>
    <div class="card-body">
        
     <p  style={{textAlign:'left'}} >Hash :  {hsh}</p>
     <p style={{textAlign:'left'}}>Success :  {succ}</p>
     <p style={{textAlign:'left'}}>Ledger :   {lgr}</p>
     <p style={{textAlign:'left'}}>Created At :  {ct}</p>
     <p style={{textAlign:'left'}}>Source Account :  {sa}</p>
     <p style={{textAlign:'left'}}> Operaions :  {oc}</p>
    </div>
  </div>
       </div>
        </div>
      )

      return (
        <div>
{thsh}
{/* {def} */}

{/* {{showtshs} ? thsh : def } */}
        </div>
        
      )
    }
    
    export default App;
  

//   function About (){


//     const [formData, setfromData] = useState({
//         set:'true',
// Sucess: false,
// hash:'',
// ledger:'',
// created_at:'',
// source_account:'',
// fee:'',
// operation_count:''
//     });

//     const location = useLocation()
//     //  const from = location.state
//     //  const from = location.state "/TransactionOfHash/
//     const type = location.state[0]
//     const t = location.state[1]
//     // const type2 = location.state

//     const fetchData = (() => {
//         axios({
//           "method": "GET",
//           "url":  "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/"+type+"/"+t,
//         })
//         .then((response) => {
//           setfromData({ ...formData, ledger: response.data.ledger})
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//       })

//     useEffect(() => {


//         fetchData();
//         // var serverPost = "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/"+type+"/"+t;
//         // await axios.get(serverPost).then(response => {
//         // //   for (var i = 0; i < response.data.length; i++) {
//         // //     formData.transactionId.push(response.data[i].id)
//         // //   }
//         // console.log(response.data)
//         //  formData.Sucess = response.data.successful
//         // })
//         // Update the document title using the browser API
        
//       });

  
// // console.log(type, t)

// // console.log(formData.Sucess)
//     // if(formData.set) {
//     //     //e.preventDefault();
//     //     var serverPost = "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/"+type+"/"+t;
        // axios.get(serverPost).then(response => {
        //   console.log("result", response.data.length)
        // //   for (var i = 0; i < response.data.length; i++) {
        // //     formData.transactionId.push(response.data[i].id)
        // //   }
//     //      formData.Sucess = response.data.successful
//     //      formData.hash = response.data.hash
//     //      formData.ledger = response.data.ledger
//     //      formData.created_at = response.data.created_at
//     //      formData.source_account = response.data.source_account
//     //      formData.fee = response.data.fee_charged
//     //      formData.operation_count = response.data.operation_count
//     //      console.log(response.data)
    
//     //      formData.set = false
//     //     //  formData.private = response.data.PKey
    
    
//     //     })
                
     
//     //    }



  






//     return (
//        <div>  
//            {/* <p>got {from}</p> */}
//        <div className="p-3 mb-2 bg-primary text-white" style={{ textAlign: 'center' }}>
//               <h1>Diamante Blockchain Explorer</h1>
//             </div>
//             <br></br>
//             <div className='container'>
//               <input class="form-control" type="text" placeholder="tx hash/Address/ledger" aria-label="Search"></input>
//             </div>
//        <div>
           

//         <p>
//         cal ""  {formData.Sucess}
//         </p>
//        </div>
       
       
       
//        </div> 

       

//     )
//     }
    
//     export default About;

// // class App extends Component {
// //     componentWillMount() {
// //       this.chainData()
// //     }

   
  
// //     async chainData() {
// //       var serverPost = "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/TransactionsAll";
// //           axios.get(serverPost).then(response => {
// //             // console.log("result", response.data.length)
// //             for (var i = 0; i < response.data.length; i++) {
// //               this.setState({ transactionID : [...this.state.transactionID, response.data[i].id ]})
// //               this.setState({ ledger : [...this.state.ledger, response.data[i].ledger ]})
// //               this.setState({ operation : [...this.state.operation, response.data[i].operation_count ]})
// //             }
// //           })
// //     }

// //     // Child () {
     
// //     //     const { from } = location.state
// //     //     this.setState({ p : from })
// //     //   }
  
// //     constructor(props){
// //         location = useLocation();
// //       super(props)
// //       this.state = { transactionID:[],
// //          ledger:[],
// //          operation:[],
// //          p:''
         
// //       } 
// //     }

 

// //     render() {

     

// //         return (
          
// //         <div>
    
    
// //     <p>got {this.state.p}</p>
        
               
            
    
          
// //                {/* <div className="App">
    
// //     </div> */}
    

// //         </div>
          
        
           
// //         );
// //       }
// //     }
    
    
// //     export default App;
    