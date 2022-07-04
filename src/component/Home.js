import '../App.css';
import React, { Component, useContext, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import LineChart from "./LineChart.js";
var UserContext = React.createContext('mainnet.diamcircle.io')

class App extends Component {
  componentDidMount() {
    this.chainData2()
    this.chainData3()
    setInterval(() => {
      this.load()
    }, 5000);
  }

  async load() {
    this.chainData2()
    this.chainData3()
  }

  async chainData2() { 
    axios.get("https://diamtestnet.diamcircle.io/ledgers?limit=10&order=desc").then(response => {
      function diff_minutes(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
      }
      for (var i = 0; i < 10; i++) {
        let age;
        var dt1 = new Date(response.data._embedded.records[i].closed_at);
        var dt2 = new Date();
        var d = diff_minutes(dt1, dt2)

        if (d <= 1) {
          age = "less than a min"
        }
        else if (d > 1 && d < 60) {
          age = Math.round(d) + " mins ago"
        }
        else if (d > 60 && d <= 1440) {
          var c = d / 60
          age = Math.round(c) + " hrs ago"
        }
        else if (d > 1440) {
          var c = d / 1440
          if (Math.round(c) <= 1) {
            age = "A Day ago"
          }
          else {
            age = Math.round(c) + " Days ago"
          }
        }
        var details = new Array(response.data._embedded.records[i].sequence, age, response.data._embedded.records[i].successful_transaction_count, response.data._embedded.records[i].failed_transaction_count);
        this.setState([...this.state.b[i] = details])
      }
    })
  }

  async chainData3() {
    // Transactions
    axios.get("https://diamtestnet.diamcircle.io/transactions?order=desc").then(response => {
      function diff_minutes(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
      }

      for (var i = 0; i < response.data._embedded.records.length; i++) {
        var b;
        var id;
        var status;
        this.setState({ transactionID: [...this.state.transactionID, "aboutTran/" + response.data._embedded.records[i].id.toString()] })
        var dt1 = new Date(response.data._embedded.records[i].created_at);
        var dt2 = new Date();
        var d = diff_minutes(dt1, dt2)
        if (d < 1) {
          b = "less than a min"
        }
        else if (d > 1 && d < 60) {
          b = Math.round(d) + " mins ago"
        }
        else if (d > 60 && d <= 1440) {
          var c = d / 60
          b = Math.round(c) + " hrs ago"
        }
        else if (d > 1440) {
          var c = d / 1440
          if (Math.round(c) <= 1) {
            b = "A Day ago"
          }
          else {
            b = Math.round(c) + " Days ago"
          }
        }
        id = response.data._embedded.records[i].id

        status = response.data._embedded.records[i].successful.toString()
        var details = new Array(id, b, status)
        // console.log("details", details)
        this.setState([...this.state.a[i] = details])
      }
    })
  }

  constructor(props) {

    super(props)
    this.state = {
      a: [],
      b: [],
      transactionID: [],
      transactionStatus: [],
      tIdTrimmed: [],
      ledgerP: [],
      ledger: [],
      ca: [],
      descr: [],
      operation: [],
      diplayNo: '0',
      search: '',
      isToggleOn: true,
      s: false,
      to: '/notfound',
      type: '',
      show2: false,
      lsq: [],
      lage: [],
      c: '',
      oc3: ''
      
    }
  }

  obj(a) {
    var newTo = {
      pathname: a,
    };

    console.log(newTo)

    return newTo
  }

  _handleKeyDown(e, str) {
    if (e.key === 'Enter') {
      if(str.length ==56){
        window.open("/aboutAcc/" + str,"_self")
      }
      else if(str.length == 64){
        window.open("/aboutTran/" + str,"_self")
      }
      else if(Number.isFinite(parseInt(str))){
        window.open( "/aboutled/"+ str,"_self")
      }
      else{
        console.log("error", typeof str )
      }
    }
  }

  swtichNetwork(e) {
   
    window.open( "http://52.52.213.122:3001/","_self")
    
  }




  render() {



    var heading = ['ID', 'Age', 'Status'];//, "Type"];

    var body = this.state.a

    var heading2 = ['Sequence', 'Age', 'Successful Txs', 'Failed Txs'];
    var body2 = this.state.b;


    return (
      <div style={{ backgroundColor: '#edf2f7' }}>
        <div style={{ backgroundColor: 'white' }}>
          <br></br>
          <div class='container' style={{ backgroundColor: 'white', borderBlockColor: 'GrayText' }}>
            <div class="row">
              <div class="col"><a href="/"> <div style={{ color: '#808080', fontWeight: 'bold', fontSize: "20px"  }}>Blockchain Explorer</div>  </a> </div>
              <div class="col"><div style={{ color: '#808080',float:"left" , fontWeight: 'bold', fontSize: "20px"  }}>Mainnet</div> </div>
              <div class="col">
                {/* <div class="input-group mb-3" >
                  <input type="text" class="form-control" onChange={(e) => this.handleClick(e.target.value)} placeholder="Tx hash / Address / ledger" id="myInput" onKeyPress={(e) => this._handleKeyDown(e)} ></input>
                </div> */}
                  <div class="input-group mb-3" >
                  <input type="text" class="form-control"  placeholder="Tx hash / Address / ledger" id="myInput" onKeyPress={(e) => this._handleKeyDown(e, e.target.value)} ></input>
                </div>
              </div>
              <div class="col" style={{ float: "right" }}><Button style={{backgroundColor:"white", borderColor:"white", color:"gray"}} onClick={() => this.swtichNetwork()}>Switch to Testnet</Button></div>
            </div>
          </div>
        </div>
        <div style={{ paddingRight: "300px", paddingLeft: "200px" }} >
          <div class="row" style={{ paddingTop: '30px' }}>
            <div class="col" style={{  width:"1000px"}} >
              {/* <h4 class='text-center' >DIAM</h4> style={{ backgroundColor:"red", width:"1px"}}*/}
              <table class="table table-bordered" style={{  width:"100p%"}}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                  <tr>
                    <th style={{ fontWeight: 'bold', textAlign: 'center', fontSize: "17px" }} colspan="4"> Test</th>

                  </tr>

                  <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <th>
                    Price USD
                    </th>
                    <th>
                    0.2 $
                    </th>
                  </tr>
                  <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <th>
                    Price EUR
                    </th>
                    <th>
                    0.95 €
                    </th>
                  </tr>
                  <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <th>
                      Price BTC
                    </th>
                    <th>
                    0.00000005 Bitcoin
                    </th>
                  </tr>
                  <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <th>
                    Price Ether
                    </th>
                    <th>
                    0.0000981354 ETH
                    </th>
                  </tr>
                  <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <th>
                      Total volume
                    </th>
                    <th>
                    200,000,000 $
                    </th>
                  </tr>
                  <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <th>
                      Total Supply
                    </th>
                    <th>
                     10 Billion
                    </th>
                  </tr>
            
                </thead></table>
              <br>
              </br>
              <hr>
              </hr>

              <br></br>
                    <p>cal</p>
                    <div style={{backgroundColor:"white"}}>
        <LineChart />
   
      </div>
                    <p>calvin</p>
            </div>
            <div class="col" style={{  width:"1000px"}} >
              <Table2 heading2={heading2} body2={body2} />
              <hr></hr>
              {/* <div class='row'> */}
              <Table heading={heading} body={body} />
             
            </div>
            
          </div>
         
        </div>
        <div className='container'>
        <table class="table table-bordered" style={{  width:"1000px", float:"center"}}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                  <tr>
                    <th style={{ fontWeight: 'bold', textAlign: 'center', fontSize: "17px" }} colspan="4"> Donations: GA6MJPKVUDNCJJDQMYPG2E7A5UJ4N2IQDFW35JYEMYPKR5SQAKYDFQ7B</th>

                  </tr>
                  </thead>
                  </table>
        </div>

   
        
      </div>
    );
  }
}

class Table extends Component {
  render() {
    var heading = this.props.heading;
    var body = this.props.body;
    return (
      <table style={{ width: "900px", height: "10px" }} class="table table-bordered">
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={{ fontWeight: 'bold', textAlign: 'center', fontSize: "17px" }} colspan="4"> Transactions</th>

          </tr>
          <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
            {heading.map(head => <th>{head}</th>)}
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'white' }}>
          {body.map(row => <TableRow row={row} />)}
        </tbody>
      </table>
    );
  }
}

class TableRow extends Component {
  render() {
    var row = this.props.row;
    var i = -1;
    return (
      <tr style={{ textAlign: 'center' }}>
        {row.map(val => <td style={{ textAlign: 'center', width: "10%" }}> {val.length == '64' ? <Link to={"aboutTran/" + val}>{val.slice(0, 20) + "..."}</Link> : val.charAt(0).toUpperCase() + val.slice(1)}</td>)}
      </tr>
    )
  }
}

class Table2 extends Component {
  render() {
    var heading = this.props.heading2;
    var body = this.props.body2;
    return (
      <table style={{ width: "100%", height: "10px" }} class="table table-bordered  ">

        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={{ fontWeight: 'bold', textAlign: 'center', fontSize: "17px" }} colspan="4"> Ledgers</th>

          </tr>
          <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
            {heading.map(head => <th style={{  whiteSpace:"nowrap" ,height:"5px"}}>{head}</th>)}
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'white' }}>
          {body.map(row => <TableRow2 row={row} />)}
        </tbody>
      </table>
    );
  }
}

class TableRow2 extends Component {
  render() {
    var row = this.props.row;
    return (
      <tr style={{ textAlign: 'center' }}>
        {row.map(val => <td style={{ textAlign: 'center', whiteSpace:"nowrap" }}> {val.toString().length == '7' ? <Link to={"aboutled/" + val}>{val}</Link> : val}</td>)}
      </tr>
    )
  }
}

export default App;

