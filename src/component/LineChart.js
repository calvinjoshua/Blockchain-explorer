import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default class LineChart extends Component {

	chartRef = React.createRef();

	componentDidMount() {

        this.chainData2()
        // setInterval(() => {
        // this.chainData2()
        //   }, 86400);

	

      

	}

    async chainData2() {
        var temp = 0//response.data._embedded.records.length//0;
        var temp2 = 0;
        axios.get("https://horizon.stellar.org/transactions?limit=100&order=desc").then(response => { //https://mainnet.diamcircle.io/transactions?order=desc
           
           
      for (var i = 0; i < response.data._embedded.records.length; i++) {
        function diff_minutes(dt2, dt1) {
            var diff = (dt2.getTime() - dt1.getTime()) / 1000;
            diff /= 60;
            return Math.abs(Math.round(diff));
          }

          
        var dt1 = new Date(response.data._embedded.records[i].created_at);
        var dt2 = new Date();
        var d = diff_minutes(dt1, dt2)

        console.log("times",i, "", d)

        if (d <= 1440) {
            temp ++// this.setState({ search: a })

      }
      if (d > 1440) {
        temp2 ++// this.setState({ search: a })

  }

    }

    console.log("here",temp)
   // this.setState({ search: temp })

    ///////////////////////
    const ctx = this.chartRef.current.getContext("2d");



    new Chart(ctx, {

        type: "line",
        data: {
            labels: ["1hr","12hr","24hrs"],
            datasets: [{ 
                data: [0,1,2,3,temp],
                label: "Transactions",
                borderColor: "#3e95cd",
                backgroundColor: "#7bb6dd",
                fill: false,
             }
            //, { 
            // 	data: [70,90,44,60,83,90,100],
            // 	label: "Accepted",
            // 	borderColor: "#3cba9f",
            // 	backgroundColor: "#71d1bd",
            // 	fill: false,
            // }, { 
            // 	data: [10,21,60,44,17,21,17],
            // 	label: "Pending",
            // 	borderColor: "#ffa500",
            // 	backgroundColor:"#ffc04d",
            // 	fill: false,
            // }, { 
            // 	data: [6,3,2,2,7,0,16],
            // 	label: "Rejected",
            // 	borderColor: "#c45850",
            // 	backgroundColor:"#d78f89",
            // 	fill: false,
            // }
            ]
        
        },
    });
    ///////////////////////

    })

    

    console.log("yo here", this.state.search)
    }

   
    // constructor(props) {

    //     super(props)
    //     this.state = {
    //       search: '',          
    //     }
    //   //  this.handleClick = this.handleClick.bind(this);
    //   }

	render() {
   

		return (
			<div>
				<canvas
				id="myChart"
				ref={this.chartRef}
				/>
			</div>
			)
	}
}