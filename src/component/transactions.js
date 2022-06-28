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

class App extends Component {
    componentDidMount() {
        setInterval(() =>
            this.chainata(),
            this.chainData()
            , 1000)
    }
    
    chainata() {
        axios.get("https://diamtestnet.diamcircle.io/ledgers?order=desc").then(response => { //operation_count
            function diff_minutes(dt2, dt1) {

                var diff = (dt2.getTime() - dt1.getTime()) / 1000;
                diff /= 60;
                return Math.abs(Math.round(diff));

            }
            // for (var i = 0; i < response.data.length; i++) {}
            for (var i = 0; i < response.data._embedded.records.length; i++) {
                this.setState({ ledger: [...this.state.ledger, response.data._embedded.records[i].sequence] })
                this.setState({ operation: [...this.state.operation, response.data._embedded.records[i].operation_count] })

                var dt1 = new Date(response.data._embedded.records[i].closed_at);
                var dt2 = new Date();
                var d = diff_minutes(dt1, dt2)
                //console.log(d);
                if (d < 1) {
                    this.setState({ lage: [...this.state.lage, "less than a min"] })
                }
                else if (d > 1 && d < 60) {
                    var c = d / 60
                    this.setState({ lage: [...this.state.lage, d, "mins ago"] })

                }
                else if (d > 60 && d < 1440) {
                    var c = d / 60
                    this.setState({ lage: [...this.state.lage, Math.round(c), "hrs ago"] })

                }
                else if (d > 1440) {
                    var c = d / 1440
                    this.setState({ lage: [...this.state.lage, Math.round(c) + " Days ago"] })
                }
            }
            // console.log("chechk",response.data._embedded.records[0].sequence)

        })
    }

    constructor(props) {
        super(props)
        this.state = {
            transactionID: [],
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
        this.handledClick2 = this.handledClick2.bind(this);
    }


    handleClick(a) {
        if (this.state.transactionID.includes(a)) {
            this.setState({ search: a })
            this.setState({ to: "/aboutTran" })
            this.setState({ type: "TransactionOfHash" })
        }
        else if (!isNaN(a)) {
            for (var i = 0; i < this.state.ledger.length; i++) {
                if (a == this.state.ledger[i]) {
                    this.setState({ search: a })
                    this.setState({ to: "/aboutled" })
                    this.setState({ type: "ledgerDetails" })
                    console.log("ledger")
                }
            }
        }
        else {
            var serverPost = "http://ec2-54-219-7-190.us-west-1.compute.amazonaws.com:3006/check/" + a;
            axios.get(serverPost).then(response => {
                console.log(response.data)
                // temp = response.data
                if (response.data === 'valid') {
                    this.setState({ search: a })
                    this.setState({ to: "/aboutAcc" })
                    this.setState({ type: "AccountDetails" })
                    console.log("account") //}
                }
            })
        }
    }

    handledClick2() {
        if (this.state.search === '') {
            window.alert("Invalid Search")
        }
    }



    render() {
        return (

            <div style={{ backgroundColor: '#edf2f7', height: '1500px' }}>
                <div style={{ width: '100%', height: '70px', backgroundColor: 'white', borderBlockColor: 'GrayText' }}>
                    <h3 style={{ color: '	#808080', float: 'left', paddingLeft: '200px', paddingTop: '20px' }}>Diamante Blockchain Explorer</h3>
                    <div class="input-group mb-3" style={{ float: 'right', width: '500px', paddingTop: '15px', paddingRight: '70px' }}> <input type="text" class="form-control" onChange={(e) => this.handleClick(e.target.value)} placeholder="Tx hash / Address / ledger" ></input>
                        <Link onClick={this.handledClick2} style={{ float: 'right', backgroundColor: 'white', borderColor: "white", color: 'grey' }} class="btn btn-outline-primary" to={this.state.to} state={[this.state.type, this.state.search]}>search</Link>

                    </div>
                </div>

            </div>



        );
    }
}

export default App;
