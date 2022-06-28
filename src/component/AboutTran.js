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

import { useLocation } from 'react-router-dom'

import {Button} from 'react-bootstrap'

function App() {
  let [hsh, sethsh] = React.useState();
  let [succ, setsucc] = React.useState();
  let [lgr, setlgr] = React.useState();
  let [ct, setct] = React.useState();
  let [sa, setsa] = React.useState();
  let [fc, setfc] = React.useState();
  let [oc, setoc] = React.useState();
  let [fee, setfee] = React.useState();
  let [pt, setpt] = React.useState();
  let [sig, setsig] = React.useState();

  let [souracc, setsouracc] = React.useState();
  let [ty, setty] = React.useState();
  let [creatA, setcreatA] = React.useState();
  let [transh, settransh] = React.useState();
  let [sb, setsb] = React.useState();
  let [acc, setacc] = React.useState();
  let [amt, setamt] = React.useState();

  //  let [bool, sBool] = React.useState(false);
  //   let [to2, st] = React.useState("notfound");
  let [search, ss] = React.useState("t");
  let [to, st] = React.useState("/notfound");
  let [typ, sty] = React.useState("t");

  let [tr, settr] = React.useState();
  const location = useParams()//useLocation();
  const type = "transactions"//location.state[0];
  const t = location.id //location.state[1];




  const swtichNetwork = () => {
   
    window.open("http://localhost:3100/","_self")

  }

 
  const fetchData = () => {
    var serverPost =
      "https://diamtestnet.diamcircle.io/" + type + "/" + t;
    axios.get(serverPost).then((response) => {
      console.log(response.data);

      console.log(response.data.successful)
      let cs = response.data.successful.toString() //()
      console.log(cs)
      setsucc(cs);
      sethsh(response.data.id);
      setlgr(response.data.ledger);
      setsig(response.data.memo_type);
      setfee((response.data.fee_charged) / 10000000);
      setpt((response.data.paging_token));

      setct(response.data.created_at);
      // setct( new Date( response.data.created_at).slice(0,30) );
      setsa(response.data.source_account);
      setfc(response.data.fee_charged);
      setoc(response.data.operation_count);
      // console.log("ca",new Date( ct))

    });
  };

  const fetchData2 = () => {
    var serverPost =
      "https://diamtestnet.diamcircle.io/transactions/" + t + "/operations";
      console.log("here", serverPost)
    axios.get(serverPost).then((response) => {
      console.log(response.data._embedded.records[0]);

      console.log(response.data._embedded.records[0].successful)

      setsouracc(response.data._embedded.records[0].source_account);
      setty(response.data._embedded.records[0].type);

      setcreatA(response.data._embedded.records[0].created_at);
      settransh(response.data._embedded.records[0].transaction_hash);
      setsb(response.data._embedded.records[0].starting_balance);
      if (response.data._embedded.records[0].account === undefined) {
        setacc(response.data._embedded.records[0].to);
        setamt(" of "+response.data._embedded.records[0].amount.toString() + " DIAM")
      }
      else {
        setacc(response.data._embedded.records[0].account);
      }

    });
  };


  React.useEffect(() => {
    fetchData();
    fetchData2();
    // handleClick();
    // load();
  }, []);

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


  const thsh = (
    <div >

      <div class="row" style={{ backgroundColor: 'white', borderBlockColor: 'GrayText', paddingTop: '20px' }}>
        <br></br>
        <div  class="container" style={{ backgroundColor: '#white', borderBlockColor: 'GrayText' }}>
          <div class="row">
{/* 
            <div class="col"><a href="/"> <h4 style={{ color: '#808080', float:"right" }}>Diamante Blockchain Explorer</h4>  </a>  </div>
            <div class="col"></div> */}
             <div class="col"><a href="/"> <div style={{ color: '#808080', fontWeight: 'bold', fontSize: "20px"  }}>Diamante Blockchain</div>  </a> </div>
              <div class="col"><div style={{ color: '#808080',float:"left" , fontWeight: 'bold', fontSize: "20px"  }}>Mainnet Explorer</div> </div>

            <div class="col">   <div class="input-group mb-3" >
              <input type="text" class="form-control" style={{ height: '38px' }} placeholder="Tx hash / Address / ledger" onKeyPress={(e) => _handleKeyDown(e, e.target.value) }></input>
              {/* <Link style={{ backgroundColor: 'white', borderColor: "white", color: 'grey' }} class="btn btn-outline-primary" to={to} state={[typ, search]}>search</Link> */}
            </div></div>
            <div class="col"> <Button style={{backgroundColor:"white", borderColor:"white", color:"gray"}} onClick={() => swtichNetwork()}>Switch to Testnet</Button></div>



          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <div class='container'>
        <table class="table table-bordered">



          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ textAlign: 'center' }}>{t}</th></tr></thead></table>


        <div class="row">
          <div class="col-sm">
            <h5 style={{ textAlign: 'center' }}>Summary</h5>
            <table class="table table-bordered">



              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th>Created At</th>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}> {ct}</td>
                </tr>
                <tr>
                  <th>Fee</th>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{fee} diam</td>
                </tr>
                <tr>
                  <th>Ledger</th>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}> <NavLink from='*' to={'/aboutled/'+ lgr }> {lgr} </NavLink></td>
                </tr>


              </thead></table></div>
          <div class="col-sm">

            <h5 style={{ textAlign: 'center' }}>Other</h5>
            <table class="table table-bordered">



              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th>Success</th>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}> {succ}</td>
                </tr>
                <tr>
                  <th>Memo</th>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{sig}</td>
                </tr>
                <tr>
                  <th>Paging token</th>
                  <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{pt}</td>
                </tr>

              </thead></table>
          </div>
        </div>
        <hr></hr>
        <h5 >Operaions</h5>
        <br></br>
        <table class="table table-bordered">



          <thead >
            <tr>
              <th>Type</th>
              <td show="false" style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{ty} {amt}</td>
             

            </tr>
            <tr>
              <th>source_account</th>
              <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}><NavLink from='*' to={'/aboutAcc/'+ souracc}> {souracc}</NavLink></td>
            </tr>
            <tr>
              <th>Account</th>
              <td style={{ backgroundColor: 'white', fontWeight: 'bold' }}><NavLink from='*' to={'/aboutAcc/'+ acc}> {acc}</NavLink></td>
            </tr>


          </thead></table>
      </div>
    </div>
  )

  return (
    <div >
      {thsh}

    </div>

  )
}

export default App;
