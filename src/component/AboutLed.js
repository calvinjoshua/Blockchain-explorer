import '../App.css';
import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  NavLink
} from 'react-router-dom';

import { Card, Button } from 'react-bootstrap'

import { useLocation } from 'react-router-dom'


function App() {
  let [hsh, sethsh] = React.useState();
  let [prev_hash, setsucc] = React.useState();
  let [closed_at, setlgr] = React.useState();
  let [fee_pool, setct] = React.useState();
  let [Bfee, setBf] = React.useState();
  let [oc, setoc] = React.useState();
  let [seq, setseq] = React.useState();
  let [Tran, settran] = React.useState();
  // let [tr, settr] = React.useState([]);
  // let [le, setle] = React.useState([]);
  const [theArray, setTheArray] = React.useState([]);

  let [nxt, setnxt] = React.useState();
  let [prev, setprev] = React.useState();

  let [search, ss] = React.useState("");
  let [to, st] = React.useState("/notfound");
  let [typ, sty] = React.useState("t");

  const location = useParams();
  //const type = location.state[0];
  const t = location.id;

  const [d, setD] = React.useState([]);

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
   
    window.open( "https://explorer.diamcircle.io/","_self")

  }

  const fetchData = () => {
    var serverPost =
      "https://diamtestnet.diamcircle.io/ledgers/" + t;
    axios.get(serverPost).then((response) => {
      setsucc(response.data.prev_hash)
      sethsh(response.data.hash);
      setlgr(response.data.closed_at);
      setseq(response.data.sequence);

      setct(response.data.fee_pool);
      setBf((response.data.base_fee_in_stroops) / 10000000);
      settran(response.data.successful_transaction_count);
      setoc(response.data.operation_count);

    });

    axios.get("https://diamtestnet.diamcircle.io/ledgers/" + t + "/operations").then((response) => {
      console.log("start", response.data._embedded.records.length)
      for (var i = 0; i < response.data._embedded.records.length; i++) {
        console.log("run")
        var details = new Array(response.data._embedded.records[i].transaction_hash, response.data._embedded.records[i].type, response.data._embedded.records[i].transaction_successful.toString());
        console.log("details", details)
        setD(d => [...d, details])
      }
    });
  };

  React.useEffect(() => {
    console.log("current t" + t)
    console.log("after t" + t)
    fetchData();
  }, []);

  var heading = ['Transaction ID', "Type", "Status"];
  var body = d;

  console.log("body", d)
  const thsh = (
    <div >
      <div style={{ backgroundColor: 'white', borderBlockColor: 'GrayText', paddingTop: '20px' }}>
        <div  class="container" style={{ backgroundColor: '#white', borderBlockColor: 'GrayText' }}>
          <div class="row">
{/* 
            <div class="col"><a href="/"> <h4 style={{ color: '#808080', float:"right" }}>Diamante Blockchain Explorer</h4>  </a>  </div>
            <div class="col"></div> */}
             <div class="col"><a href="/"> <div style={{ color: '#808080', fontWeight: 'bold', fontSize: "20px"  }}>Diamante Blockchain</div>  </a> </div>
              <div class="col"><div style={{ color: '#808080',float:"left" , fontWeight: 'bold', fontSize: "20px"  }}>Testnet Explorer</div> </div>

            <div class="col">   <div class="input-group mb-3" >
            <input type="text" class="form-control" style={{ height: '38px' }} placeholder="Tx hash / Address / ledger" onKeyPress={(e) => _handleKeyDown(e, e.target.value) }></input>
            </div></div>
            <div class="col"> <Button style={{backgroundColor:"white", borderColor:"white", color:"gray"}} onClick={() => swtichNetwork()}>Switch to Mainnet</Button></div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div class='container'>
        <table class="table table-bordered">
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ textAlign: 'center' }}>Ledger</th>
            </tr></thead></table>
        <table class="table table-bordered">
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ textAlign: 'center' }}>{t}</th></tr></thead></table>
        <div class="row">
          <div class="col-sm">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th>sequence</th>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{seq}</td>
                </tr>
              </thead></table>
          </div>
          <div class="col-sm">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th>hash</th>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}> {hsh}</td>
                </tr></thead>
            </table>
          </div>
          <div class="col-sm">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th>Created At</th>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{closed_at}</td>
                </tr></thead></table>
          </div>
        </div>
        <hr></hr>
        {/* <h5 >Operaions</h5> */}
        <br></br>
        <div class="row">
          <div class="col-sm">
            <h5>Info</h5>
            <table class="table table-bordered">
              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th>Base fee</th>
                  <th>Fee pool</th>
                  {/* <th>hash</th> */}
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{Bfee} </td>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{fee_pool} </td>
                </tr>
              </thead></table>
          </div>
          <div class="col-sm">
            <h5>Count</h5>
            <table class="table table-bordered">
              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th>Operaions</th>
                  <th>Transaction</th>
                  {/* <th>hash</th> */}
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}>
                    {oc}
                  </td>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}>
                    {Tran}
                  </td>
                </tr>
              </thead>
            </table>
            {/* {names.map(name => <h2>{name}</h2>)} */}
            {/* 
              <div>
                { pp < 1 ? buildTable() : "nope"}
              </div> */}
          </div>
        </div>
      </div>
    </div>
  )

  const loading = (
    <div style={{width:"100%"}}>
      <table class="table table-bordered">
        <thead>
          <th style={{ textAlign: 'center' }}>Transactions</th>
        </thead>
      </table>
      <table class="table table-bordered">
        <thead colspan="1" style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            {heading.map(head => <th style={{ textAlign: 'center',  }}>{head}</th>)}
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'white' }}>
          {body.map(row => <tr>
            {row.map(val => <td style={{ textAlign: 'center', width: "10%",  fontWeight: 'bold' }}> {val.toString().length == '64' ? <NavLink from='*' to={'/aboutTran/'+val}>{val.slice(0, 20) + "..."}</NavLink>:  val }</td>)}      
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

export default App;

