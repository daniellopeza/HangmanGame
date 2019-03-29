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

  // onMount() can be where database info is fetched!

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
            return {
                guess,
            };
        });
    }

  async handleSubmit(event){
    event.preventDefault(); // prevents refresh after submittion

    const {word, guess} = this.state;

    if (this.state.letterGuess.length > 1){
        alert("Please enter 1 character.")
        return;
    }

    let i = 0;
    while(i < this.state.word.length){
        if(this.state.word[i].toLowerCase() == this.state.letterGuess.toLowerCase()){
            console.log("Good Job! Guessed one letter.")
            this.updateItem(i)
        }
        i++;
    }
    // const form = await axios.post('/api/form', {
    //     name, // == name: name;
    //     email,
    //     systemType,
    //     rSelected,
    // })
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