import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    fetch('/')
  }


  render() {
    console.log("Rendering App Component\n")
    return (
      <Router>
        {/* need divs when using multiple components */}
        <div> 
            <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
