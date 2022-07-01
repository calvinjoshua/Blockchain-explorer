import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Redirect,
  NavLink,
  withRouter
} from 'react-router-dom';
import { watch, unwatch } from 'watch-object'

import { useLocation } from 'react-router-dom'

import { Button } from 'react-bootstrap'
// import { Account } from 'stellar-sdk';


function Account() {

  let [hsh, sethsh] = React.useState(); //id
  let [succ, setsucc] = React.useState(); //
  let [lgr, setlgr] = React.useState(); //seq
  let [ct, setct] = React.useState(); //lml
  let [sa, setsa] = React.useState(); //lmt
  let [fc, setfc] = React.useState(); //bal
  let [oc, setfc1] = React.useState(); //l
  let [oc1, setfc2] = React.useState(); //bl
  let [oc2, setfc3] = React.useState();//sl
  let [oc3, setfc4] = React.useState(); //at

  let [search, ss] = React.useState("t");
  let [to, st] = React.useState("/notfound");
  let [typ, sty] = React.useState("t");

  const [d, setD] = React.useState([]);

  const location = useParams()//useLocation();
  const type = "AccountDetails"//location.state[0];
  const t = location.id //location.state[1];

  var tem = false;



  console.log("accoutn id", tem)


  var obj = {
    a: t,

  }

  console.log(obj)
  watch(obj, 'a', function (newVal, oldVal) {
    console.log("newVal, oldVal")
  })

 



  const _handleKeyDown = (e, str) => {
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

  const swtichNetwork = () => {

    window.open("http://localhost:3100/", "_self")

  }

  const fetchData = () => {
    // while (! tem ) {
    // code block to be executed
    // } if(! tem ){
    var serverPost =
      "https://diamtestnet.diamcircle.io/accounts/" + t;
    console.log(serverPost)
    axios.get(serverPost).then((response) => {
      console.log(response.data.balances[0].balance);
 
      setfc(0);

      sethsh(response.data.account_id);
      setlgr(response.data.sequence);

      setct(response.data.last_modified_ledger);
      setsa(response.data.last_modified_time);
      setfc(response.data.balances[0].balance);
      setfc1(response.data.balances[0].limit);
      setfc2(response.data.balances[0].buying_liabilities);
      setfc3(response.data.balances[0].selling_liabilities);
      setfc4(response.data.balances[0].asset_type);
      console.log(succ)
      axios.get("https://diamtestnet.diamcircle.io/accounts/" + t + "/payments").then((response) => {
        console.log("start", response.data._embedded.records.length)

        for (var i = 0; i < response.data._embedded.records.length; i++) {
          console.log("run", response.data._embedded.records[i].account == undefined ? response.data._embedded.records[i].to : response.data._embedded.records[i].account)

          var details = new Array(response.data._embedded.records[i].source_account, response.data._embedded.records[i].transaction_hash, response.data._embedded.records[i].type, response.data._embedded.records[i].account == undefined ? response.data._embedded.records[i].to : response.data._embedded.records[i].account);
          console.log("details", details)
          setD(d => [...d, details])
        }

      });
    });
    // tem = true
    //}
  };


  React.useEffect(() => {
    setD(d => [])
    fetchData();
  }, [t]);

  const def = (
    <div>
      <p> Opps, Sorry</p>
    </div>
  )

  var heading = ['Source Account', 'Hash', 'Type', "Address"];
  var body = d;


  const thsh = (


    <div>
      <div class="row" style={{ backgroundColor: 'white', borderBlockColor: 'GrayText', paddingTop: '20px' }}>
        <br></br>
        <div class="container" style={{ backgroundColor: '#white', borderBlockColor: 'GrayText' }}>
          <div class="row">
            {/* 
            <div class="col"><a href="/"> <h4 style={{ color: '#808080', float:"right" }}>Diamante Blockchain Explorer</h4>  </a>  </div>
            <div class="col"></div> */}
            <div class="col"><a href="/"> <div style={{ color: '#808080', fontWeight: 'bold', fontSize: "20px" }}>Diamante Blockchain</div>  </a> </div>
            <div class="col"><div style={{ color: '#808080', float: "left", fontWeight: 'bold', fontSize: "20px" }}>Mainnet Explorer</div> </div>
            <div class="col-6 col-md-4">   <div class="input-group mb-3" >
            <input type="text" class="form-control" style={{ height: '38px' }} placeholder="Tx hash / Address / ledger" onKeyPress={(e) => _handleKeyDown(e, e.target.value) }></input>
            </div></div>
            <div class="col"> <Button style={{ backgroundColor: "white", borderColor: "white", color: "gray" }} onClick={() => swtichNetwork()}>Switch to Testnet</Button></div>


          </div>
        </div>
      </div>


      <br></br>

      <br></br>

      <div class='container'>

        <table class="table table-bordered">
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ textAlign: 'center' }}>Account</th>
            </tr></thead></table>
        <table class="table table-bordered">



          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ textAlign: 'center' }}>{t}

              </th></tr></thead></table>
        <div class="row">
          <div class="col-sm">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th style={{ textAlign: 'center' }}>Asset</th>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold', textAlign: 'center' }}>DIAM</td>
                </tr>
              </thead></table>
          </div>
          <div class="col-sm">

            <table class="table table-bordered">



              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th style={{ textAlign: 'center' }}>Balance</th>

                </tr>
                <tr>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold', textAlign: 'center' }}> {fc}</td>
                </tr></thead></table>

          </div>
        </div>
        <br></br>

      </div>
    </div>
  )

  const loading = (

    <div style={{ width: "100%" }}>
      <table class="table table-bordered">
        <thead>

          <th style={{ textAlign: 'center' }}>Transactions</th>
        </thead>
      </table>
      <table class="table table-bordered">
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            {heading.map(head => <th style={{ textAlign: 'center' }}>{head}</th>)}
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'white' }}>
          {body.map(row => <tr>
            {row.map(val => <td style={{ textAlign: 'center', width: "10%", fontWeight: 'bold' }}> {val.toString().length == '56' ? <NavLink from='*' to={'/aboutAcc/' + val}  >{val.slice(0, 20) + "..."} </NavLink> : val.toString().length > '56' ? <NavLink from='*' to={'/aboutTran/' + val}>{val.slice(0, 15) + "..."}</NavLink> : val}</td>)}

          </tr>)}
        </tbody>
      </table>

    </div>
  )

  const empty = (
    <div>

    </div>
  )

  return (
    <div>
      {thsh}
      <div className='container'>
        {d.length > 0 ? loading : empty}
      </div>
    </div>

  )
}

export default Account;
