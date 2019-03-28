import React, { Component } from 'react';
import './App.css';
import App from './App';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: ["D", "a", "r", "l", "y"],
      guess: ["_", "_", "_", "_", "_"]
    };
  }


  render() {
      console.log("Rendering Home page")
    return (
        
      <div className="Home">

        <header className="App-header">
          <p> Hangman</p>

          <table  id= "myTable">
            <tbody>
                <tr>
                    {this.state.guess.map(item => (
                    <th key={item}>{item}</th>
                    ))}
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
