import React, { Component } from 'react';
import update from 'react-addons-update';
import './App.css';
import App from './App';
import Table from './table';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: [],
      guess: ["_", "_", "_", "_", "_"],
      letterGuess: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // initialize game state from DB on mount
  componentDidMount() {
    fetch('/getGuess')
    .then(res => res.json())
    .then(json => {
        this.setState(json)
        console.log("HOME CDM received: ", json.guess)
    })

    fetch('/getWord')
    .then(res => res.json())
    .then(json => {
        this.setState(json)
        console.log("HOME CDM received: ", json.word)
    })
    
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateItem = i => {
      this.setState(state => {
          const guess = state.guess.map((item, j) => {
              if (j === i) {
                  return this.state.word[i];
              } else {
                  return item;
              }
          });

          return {guess,};
      });
  }

  // handleSubmit = async (event) =>
  async handleSubmit(event){
    event.preventDefault(); // prevents refresh after submittion

    const {word, guess} = this.state;

    if (this.state.letterGuess.length > 1){
        alert("Please enter 1 character.")
        return;
    }

    // Hangman Game Functionality: iterate through game word and
    // current guessed, if the current guess matches any letter
    // in the game word, update the current guessed array to 
    // display the correct guessed letter.
    // The front-end will update its state in updateItem() 
    // and then send the updated state to the server to store in DB. 
    // NOTE: need to worry about updated changed being represented 
    // one two nodes. If we only fetch for the curr guessed at the 
    // beginning of the game, then updates wont be shown on the other clients. 
    let i = 0;
    let guessedOne = false;
    while(i < this.state.word.length){
        if(this.state.word[i].toLowerCase() == this.state.letterGuess.toLowerCase()){
            console.log("Good Job! Guessed one letter.")
            guessedOne = true;
            await this.updateItem(i)  
        }
        i++;
    }

    if (!guessedOne) alert('Guess not correct. Try again.')

    // fetch after guess has been updated
    // if client did not guess one, but has updates on another client, 
    // this fetch will get those updates and show them to this client
    fetch('/enterGuess', 
      {
        method: 'POST',
        body: JSON.stringify(this.state.guess),
        headers : { 
          // NEED headers to send json obj
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        } 
      })
      .then(res => res.json())
      .then(json => {
        console.log("Front-end received: ", json)
        this.setState({guess: json.updatedGuess})
      })
      .catch(err => console.log("ERROR: ", err))
  }


  render() {
    return (
        
      <div className="Home">
        <header className="App-header">
          <p> Hangman</p>
            <Table guess={this.state.guess}/>

            <form name="guessForm" method="POST" onSubmit={this.handleSubmit}>
                <br></br>
                Guess a letter: 
                <input type="text" name="letterGuess" onChange={this.handleChange}/>
                <input type="submit" value="submit" onChange={this.handleChange}/>
            </form>
        </header>
      </div>
    );
  }
}

export default Home;