import React, { Component } from 'react';
import update from 'react-addons-update';
import './App.css';
import App from './App';
import Table from './table';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: Feed word via props
      word: ["C", "l", "o", "u", "d"],
      guess: ["_", "_", "_", "_", "_"],
      letterGuess: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // get database info on mount and set state
  componentDidMount() {
    fetch('/getGuess')
    .then(res => res.json())
    .then(json => {
      this.setState(json)
      console.log("HOME CDM received: ", json.guess)
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

  async handleSubmit(event){
    event.preventDefault(); // prevents refresh after submittion
    console.log("handleSubmit")
    const {word, guess} = this.state;

    if (this.state.letterGuess.length > 1){
        alert("Please enter 1 character.")
        return;
    }

    // iterate through game word and current guessed, if the current guess matches
    // any letter in the game word, update the current guessed array to display the
    // correct guessed letter.
    let i = 0;
    while(i < this.state.word.length){
        if(this.state.word[i].toLowerCase() == this.state.letterGuess.toLowerCase()){
            console.log("Good Job! Guessed one letter.")
            await this.updateItem(i)  
        }
        i++;
    }

    // fetch after guess has been updated
    fetch('/enterGuess', 
      {
        method: 'POST',
        body: JSON.stringify(this.state.guess),
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        } // NEED headers to send json obj
      })
      .then(res => res.json())
      .then(json => console.log("Front-end received: ", json))
      .catch(err => console.log("ERROR: ", err))
  }


  render() {
    return (
        
      <div className="Home">
        <header className="App-header">
          <p> Hangman</p>
          {console.log("state rendering = ", this.state.guess)}
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