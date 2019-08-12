import React, {Component} from "react";
import result from "./test-data"
import "./App.css";

// http://itunes.apple.com/us/lookup?id=1389971325

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: result
      }
  }

  componentDidMount() {
    // console.log(result)
  }


  getOption() {
    let title = this.state.data.results.map(item => item.trackName)
    // console.log(title)
    let randomNumber = Math.floor(Math.random() * title.length)
    console.log(randomNumber)

    let tempOption = title[randomNumber]

    for(let i = 0 ; i<title.length; i++) {
      if( title[i] === tempOption) {
        title.splice(i,1)
      }
    }
    console.log(title)

    return tempOption
  }  

  render() {

  
    return(
      <div className="App">
        <div className="App-header">
          <h1>Guess That Song</h1>

          <img src={this.state.data.results[0].artworkUrl100} alt="" />
          <br />
          
          <audio src={this.state.data.results[0].previewUrl} controls>
            Audio not supported
          </audio>
          <br />
          
          <div>
            <button>{this.getOption()}</button>
            <button>{this.getOption()}</button>
            <button>{this.getOption()}</button>
            <button>{this.getOption()}</button>
          </div>
        </div>
      </div>
    )
  }
}
export default App