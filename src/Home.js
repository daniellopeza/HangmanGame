import React, { Component } from 'react';
import logo from './hangmanLogo.png';
import './App.css';
import App from './App';

class Home extends Component {
  render() {
      console.log("Rendering Home page")
    return (
      <div className="Home">

        <header className="App-header">
          {/* <img src={logo} className="App-img" alt="logo" /> */}
          <p>
            {/* Edit <code>src/App.js</code> and save to reload. */}
            Hangman
          </p>
          <table  id= "myTable">
          <tbody>
            <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
            </tr>
            </tbody>
            </table>

            <form>
            <br></br>
            Guess a letter: 
            <input type="text" name="guess"/>
            <input type="submit" value="Submit"/>
            </form>
        </header>
        
        


      </div>
    );
  }
}

export default Home;
