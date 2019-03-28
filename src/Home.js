import React, { Component } from 'react';
import './App.css';
import App from './App';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: Feed word via props
      word: ["D", "a", "r", "l", "y"],
      guess: ["_", "_", "_", "_", "_"],
      letterGuess: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  async handleSubmit(event){
    event.preventDefault(); // prevents refresh after submittion

    const {word, guess} = this.state;
    console.log("user guessed = ", this.state.letterGuess)
    

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

            <table id= "myTable">
                <tbody>
                    <tr>
                        {this.state.guess.map(item => (
                        <th key={item}>{item}</th>
                        ))}
                    </tr>
                </tbody>
            </table>

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
