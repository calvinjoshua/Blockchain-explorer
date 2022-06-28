import '../App.css';
import React, { Component, useState } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'




class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactionID: [],
            tIdTrimmed: [],
            ledger: [],
            ca: [],
            descr: [],
            operation: [],
            diplayNo: '0',
            search: '',
            isToggleOn: true,
            s: false,
            to: '',
            type: '',
            show2: false,
            lsq: [],
            lage: [],


            oc3: ''

        }

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(a) {
        var serverPost = "https://diamtestnet.diamcircle.io/transactions/"+a
     
        console.log("truce")
     
        axios.get(serverPost).then(response => {
         if(response.status == 200){
          this.setState({ search: a })
          this.setState({ to: "/aboutTran" })
          this.setState({ type: "Transactions" })
       
           console.log("transaction" ,response.status)   
         }
        })
    
        var serverPost1 = "https://diamtestnet.diamcircle.io/ledgers/"+a;
     
        axios.get(serverPost1).then(response => {
          if(response.status == 200){
           this.setState({ search: a })
           this.setState({ to: "/aboutled" })
           this.setState({ type: "ledgerDetails" })
      
            console.log("ledger", response.status)  
          //  break;
          }
          // else{
          //   continue
          // }
        })
    
        var serverPost2 = "https://diamtestnet.diamcircle.io/accounts/"+a;
     
        axios.get(serverPost2).then(response => {
          if(response.status == 200){
           this.setState({ search: a })
           this.setState({ to: "/aboutAcc" })
           this.setState({ type: "AccountDetails" })
     
      
            console.log("account", response.status)  
          //  break;
          }
          else{
           this.setState({ to: "/notfound" })
           // st("/notfound")
          console.log("calvin", this.state.to) 
        }
        })
    
    
        // if (this.state.transactionID.includes(a)) {
    
        //   this.setState({ search: a })
        //   this.setState({ to: "/aboutTran" })
        //   this.setState({ type: "TransactionOfHash" })
    
        // }
        // else if (!isNaN(a)) {
        //   for (var i = 0; i < this.state.ledger.length; i++) {
        //     if (a == this.state.ledger[i]) {
        //       this.setState({ search: a })
        //       this.setState({ to: "/aboutled" })
        //       this.setState({ type: "ledgerDetails" })
        //       console.log("ledger")
        //     }
        //   }
        // }
        // else {
    
        //   var serverPost = "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/check/" + a;
        //   axios.get(serverPost).then(response => {
        //     console.log(response.data)
        //     // temp = response.data
        //     if (response.data === 'valid') {
        //       this.setState({ search: a })
        //       this.setState({ to: "/aboutAcc" })
        //       this.setState({ type: "AccountDetails" })
        //       console.log("account") //}
        //     }
    
        //   })
        // }
    
      }




    render() {
        return (



            <div style={{ backgroundColor: '#edf2f7', height: '1000px' }}>
                {/* <div>{this.state.lage}</div> */}
                <div style={{ width: '100%', height: '70px', backgroundColor: 'white', borderBlockColor: 'GrayText' }}>
          <h3 style={{ color:'	#808080',float: 'left', paddingLeft: '200px', paddingTop: '20px' }}>Diamante Blockchain Explorer</h3>
          {/* <div class="search"> <i class="fa fa-search"></i> <input type="text" class="form-control" onChange={(e) => this.handleClick(e.target.value)} placeholder=style={{paddingTop:'1o0px'}}></input> <button class="btn btn-primary" style={{ backgroundColor: 'white', borderColor: 'blue' }}> <Link onClick={this.handledClick2} style={{ float: 'right', backgroundColor: 'white', borderColor: "white", color: 'black' }} class="btn btn-outline-primary" to={this.state.to} state={[this.state.type, this.state.search]}>search</Link></button> </div>  */}

          {/* <div class="search"> <i class="fa fa-search"></i> <input type="text" class="form-control" onChange={(e) => this.handleClick(e.target.value)} placeholder="Tx hash / Address / ledger" ></input>  <Link onClick={this.handledClick2} style={{ float: 'right', backgroundColor: 'white', borderColor: "white", color: 'black' }} class="btn btn-outline-primary" to={this.state.to} state={[this.state.type, this.state.search]}>search</Link> </div>  */}

          {/* <h1 style={{ float:'right' }}>Diamante Blockchain Explorer</h1> */}
          {/* <div class="ontainer justify-content-center">
    <div class="row">
        <div class="col-md-8"> */}
          <div class="input-group mb-3" style={{ float: 'right', width: '500px', paddingTop: '15px', paddingRight: '70px' }}> <input type="text" class="form-control" onChange={(e) => this.handleClick(e.target.value)} placeholder="Tx hash / Address / ledger" ></input>
            <Link style={{ float: 'right', backgroundColor: 'white', borderColor: "white", color: 'grey' }} class="btn btn-outline-primary" to={this.state.to} state={[this.state.type, this.state.search]}>search</Link>
            {/* <button class="btn " type="button" style={{backgroundColor: 'white'}}>search</button>  */}
            {/* </div>
        </div>
    </div> */}
          </div>
        </div>



        {/* <div className="p-3 mb-2 bg-primary text-white" >
          <h1 style={{float: 'left' }}>Diamante Blockchain Explorer</h1>
          <h1 style={{ float:'right' }}>Diamante Blockchain Explorer</h1>
         
         <div class="search"> <i class="fa fa-search"></i> <input type="text" class="form-control" onChange={(e) => this.handleClick(e.target.value)} placeholder="Tx hash / Address / ledger"></input> <button class="btn btn-primary" style={{ backgroundColor: 'white', borderColor: 'grey', alignContent: 'center' }}> <Link onClick={this.handledClick2} style={{ float: 'right', backgroundColor: 'white', borderColor: "white", color: 'black' }} class="btn btn-outline-primary" to={this.state.to} state={[this.state.type, this.state.search]}>search</Link></button> </div> 


          {/* <div class="search"> <i class="fa fa-search"></i> <input type="text" class="form-control" onChange={(e) => this.handleClick(e.target.value)} placeholder="Tx hash / Address / ledger" style={{ float: 'right',width:'400px'}}></input> <button class="btn btn-primary" style={{ backgroundColor: 'white',float:'right' , borderColor: 'grey', alignContent: 'center' }}> <Link onClick={this.handledClick2} style={{ float: 'left', backgroundColor: 'white', borderColor: "white", color: 'black' }} class="btn btn-outline-primary" to={this.state.to} state={[this.state.type, this.state.search]}>search</Link></button> </div> */}

        {/* </div> */}
        {/* </div> */}
        {/* <i> <input type="text" class="form-control" onChange={(e) => this.handleClick(e.target.value)} placeholder="Tx hash / Address / ledger" style={{ float: 'right',width:'400px'}}></input>  <button class="btn btn-primary" style={{ backgroundColor: 'white',float:'right' , borderColor: 'grey', alignContent: 'center' }}> <Link onClick={this.handledClick2} style={{ float: 'left', backgroundColor: 'white', borderColor: "white", color: 'black' }} class="btn btn-outline-primary" to={this.state.to} state={[this.state.type, this.state.search]}>search</Link></button></i> */}


        {/* <div class="search"> <i class="fa fa-search"></i> <input type="text" class="form-control" onChange={(e) => this.handleClick(e.target.value)} placeholder="Tx hash / Address / ledger"></input> <button class="btn btn-primary" style={{ backgroundColor: 'white', borderColor: 'grey', alignContent: 'center' }}> <Link onClick={this.handledClick2} style={{ float: 'right', backgroundColor: 'white', borderColor: "white", color: 'black' }} class="btn btn-outline-primary" to={this.state.to} state={[this.state.type, this.state.search]}>search</Link></button> </div> */}


        {/* <div className='container' style={{ display: '"-ms-inline-grid" '}}>
          <input type="search" class="form-control rounded" placeholder="tx hash/Address/ledger" onChange={(e) => this.handleClick(e.target.value)} aria-label="Search" aria-describedby="search-addon" />
          <Link onClick={this.handledClick2} style={{ float: 'right' }} class="btn btn-outline-primary" to={this.state.to} state={[this.state.type, this.state.search]}>search</Link>
        </div> */}

        <div>

        </div>
                <br></br>
                <div class="container">
                <Card style={{backgroundColor: '#edf2f7'}}>
  <Card.Body> <h1 style={{textAlign:'center'}}>Not found 👀</h1></Card.Body>
</Card></div>

               

                {/* 
        <div class="container">
  <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col-6">
      2 of 3 (wider)
    </div>
    <div class="col">
      3 of 3
    </div>
  </div>
  <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col-5">
      2 of 3 (wider)
    </div>
    <div class="col">
      3 of 3
    </div>
  </div>
</div> */}




                {/* <div class="container"> */}


            </div>



        );
    }
}

export default App;
