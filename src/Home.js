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
      word: ["D", "a", "r", "l", "y"],
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
                console.log("i = ", i)
                console.log("j = ", j)
                
                if (j == i) {
                    console.log("Setting char to ", this.state.word[i])
                    return this.state.word[i];
                } else {
                    console.log("no ", i)
                    return item;
                }
            });

            console.log("guess = ", guess)
            return {
                guess,
            };
        });
    }

  async handleSubmit(event){
    event.preventDefault(); // prevents refresh after submittion

    const {word, guess} = this.state;
    console.log("user guessed = ", this.state.letterGuess)
    console.log("length       = ", this.state.letterGuess.length)

    if (this.state.letterGuess.length > 1){
        alert("Please enter 1 character.")
        return;
    }

    console.log("word       = ", this.state.word)
    let i = 0;
    while(i < this.state.word.length){
        if(this.state.word[i].toLowerCase() == this.state.letterGuess.toLowerCase()){
            console.log("Good Job! Guessed one letter.")
            console.log("setting " , i , " to ", this.state.word[i])
            //this.setState({guess: []})
            this.updateItem(i)
            // let guess = this.state.guess;
            // guess[i] = this.state.word[i]//{...guess[i], key: this.state.word[i]};
            // this.setState({
            //     guess: guess
            // })
            // this.state.guess[i] = this.state.word[i]
            // this.forceUpdate()
            //this.setState({guess: this.state.guess})
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
      //console.log("rendering, guess = ", this.state.guess)
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


    // return (
        
    //   <div className="Home">
    //     <header className="App-header">
    //       <p> Hangman</p>
    //       {console.log("state rendering = ", this.state.guess)}
    //         <table id= "myTable">
    //             <tbody>
    //                 <tr>
    //                     {this.state.guess.map(item => (
    //                      <th key={item}>{item}</th>
    //                     ))}
    //                 </tr>
    //             </tbody>
    //         </table>

    //         <form name="guessForm" method="POST" onSubmit={this.handleSubmit}>
    //             <br></br>
    //             Guess a letter: 
    //             <input type="text" name="letterGuess" onChange={this.handleChange}/>
    //             <input type="submit" value="submit" onChange={this.handleChange}/>
    //         </form>
    //     </header>
    //   </div>
    // );