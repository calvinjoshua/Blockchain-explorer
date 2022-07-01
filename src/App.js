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
// import NotFound from './component/nf';




class App extends Component {
  render() {
    return (
      
      <Router>
        <div to="/"></div> 
<Routes>
    <Route exact path='/' element={< Home />}></Route>
    <Route exact path='/aboutTran/:id' element={< AboutT />}></Route>
    <Route exact path='/aboutled/:id' element={< AboutL />}></Route>
    <Route exact path='/aboutAcc/:id' element={< AboutA />}></Route>
    {/* <Route exact path='/notfound' element={< NotFound />}></Route> */}
</Routes>
     
       </Router> 
    );
  }
}


export default App;
