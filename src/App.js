import React, {Component} from "react";
import result from "./test-data"
import "./App.css";

/*
  #1 - setState does not update state immediately so workaround is passing default values to the state item options
       so that the is no undefined error when calling this.state.options[1]
*/

// http://itunes.apple.com/us/lookup?id=1389971325

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: result,
      currentSong: {
         "artistName":"",
         "collectionName":"",
         "trackName":"",
         "previewUrl":"",
         "artworkUrl100":"",
         "primaryGenreName":""
      },
      options: ['abc','def','ghi','jkl'] // #1
      }
  }

  componentDidMount() {
    console.log('componentDidMount')

    this.getCurrentSong();
  }

  getCurrentSong() {
    //updates the state.currentSong with Random Track
    console.log("getCurrentSong")

    let resultsLen = this.state.data.results.length
    let randomNumber = Math.floor(Math.random() * resultsLen)

    this.setState({currentSong: this.state.data.results[randomNumber]})

    // this.setState({currentSong: this.state.data.results[randomNumber]}, () => {
    //   this.optionsForCurrentSong()
    // })
  }

  optionsForCurrentSong() {
    let randomNumber = Math.floor(Math.random() * 4)
console.log(this.state.currentSong.trackName)
console.log(this.state.options[1])
    let answers = this.shuffle(this.state.data.results)
    answers[randomNumber] = this.state.currentSong.trackName
    this.setState({options: answers})  // #1

    
    // this.setState({options[1]: 'test'})
  }

  // componentDidUpdate(prevState) {
  //   if(this.state.currentSong !== prevState.currentSong) {
  //     console.log('hurray')
  //     this.optionsForCurrentSong()
  //   }

  // }

  shuffle(array) {
      var arrayCopy = array.slice();
      var m = arrayCopy.length, t, i;

      // While there remain elements to shuffle…
      while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = arrayCopy[m];
        arrayCopy[m] = arrayCopy[i];
        arrayCopy[i] = t;
      }

      return arrayCopy;
    }


  check() {
    console.log('test')
    console.log(this.value)
  }

  render() {

    // console.log(this.state.currentSong.trackName)
    // console.log(this.state.options[0].trackName)
    // if(this.state.currentSong.trackName === this.state.options[0].trackName) { console.log('true1')} else {console.log('false1')}
    // if(this.state.currentSong.trackName === this.state.options[1].trackName) { console.log('true2')} else {console.log('false2')}
    // if(this.state.currentSong.trackName === this.state.options[2].trackName) { console.log('true3')} else {console.log('false3')}
    // if(this.state.currentSong.trackName === this.state.options[3].trackName) { console.log('true4')} else {console.log('false4')}
    
    return(
      <div className="App">
        <div className="App-header">
          <h1>Guess That Song</h1>

        {/* need to display a random song image */}

          <img src={this.state.currentSong.artworkUrl100} alt="" />
          <br />
          
        {/* need to present a song audio that is of the above image */}

          <audio src={this.state.currentSong.previewUrl} controls>
            Audio not supported
          </audio>
          <br />

          
          
          <div>
            <button onClick={this.check} value={this.state.options[0].trackName}>{this.state.options[0].trackName}</button> {/*#1*/}
            <button value={this.state.options[1].trackName}>{this.state.options[1].trackName}</button>
            <button value={this.state.options[2].trackName}>{this.state.options[2].trackName}</button>
            <button value={this.state.options[3].trackName}>{this.state.options[3].trackName}</button>
          
          </div>
        </div>
      </div>
    )
  }
}
export default App