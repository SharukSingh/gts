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
      score: 0,
      options: [] // #1
      }
  }

  componentDidMount() {
    console.log('componentDidMount')

    this.getCurrentSong();
    this.optionsForCurrentSong();
  }

  optionsForCurrentSong() {
    //shuffle the objects inside results array
    let answers = this.shuffle(this.state.data.results)
    //get only the trackname from the answers object
    let answersTrackName = answers.map(item => item.trackName)
    //get only 4 options from answersTrackName
    let options = answersTrackName.splice(0,4)
    //search the current song track if add that to options if not currently there


    let currentTrackName = this.state.currentSong.trackName
    let trackIndex = options.findIndex(checkTrackName, currentTrackName)

    function checkTrackName(name) {
      return name === currentTrackName
    }

    let randomNumber = Math.floor(Math.random() * 4)
    if(trackIndex === -1) {
      options[randomNumber] = currentTrackName
    }

    this.setState({options: options})
  }

  getCurrentSong() {
    //updates the state.currentSong with Random Track
    console.log("getCurrentSong")

    let resultsLen = this.state.data.results.length
    let randomNumber = Math.floor(Math.random() * resultsLen)

    this.setState({currentSong: this.state.data.results[randomNumber]}, () => {
      this.optionsForCurrentSong()
    })
  }



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


  check(e) {
    if(e.target.value === this.state.currentSong.trackName) {
      console.log('correct')
      this.setState(prevState => ({
        score: prevState.score + 10
      }))
      this.getCurrentSong();
    } else {
      console.log('not correct')
      this.setState(prevState => ({
        score: prevState.score - 5
      }))
    }
  }

  timer() {
    return 5;
  }

  render() {

    console.log('render')
    return(
      <div className="App">
        <div className="App-header">
          <h1>Guess That Song</h1>

        {/* need to display a random song image */}
        <p>Score: {this.state.score}</p>
          <img src={this.state.currentSong.artworkUrl100} alt="" />
          <br />
          
        {/* need to present a song audio that is of the above image */}

          <audio src={this.state.currentSong.previewUrl} controls autoPlay>
            Audio not supported
          </audio>
          <br />

          <progress value="1" max="10"></progress>

          <p>time: {this.timer()}</p>


          <div>
            <button className="Option-Btn" onClick={(e) => this.check(e)} value={this.state.options[0]}>{this.state.options[0]}</button> {/*#1*/}
            <button className="Option-Btn" onClick={(e) => this.check(e)} value={this.state.options[1]}>{this.state.options[1]}</button>
            <button className="Option-Btn" onClick={(e) => this.check(e)} value={this.state.options[2]}>{this.state.options[2]}</button>
            <button className="Option-Btn" onClick={(e) => this.check(e)} value={this.state.options[3]}>{this.state.options[3]}</button>
            <br/>
            {/*<button onClick={(e) => this.getCurrentSong(e)}>test next song</button>*/}
          
          </div>
        </div>
      </div>
    )
  }
}

/*
<audio id="player" src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/90/1c/dc/901cdc1f-aff3-c2b3-fb5d-0877f3f92bf4/mzaf_3141468634002767849.plus.aac.p.m4a">
  not supported
</audio>

<button onclick="document.getElementById('player').play()">Play</button>
<button onclick="document.getElementById('player').pause()">Pause</button>



render() {
    const buttons = [1, 2, 3].map(id => (
      <button
        key={id}
        name={`button${id}`}
        onClick={this.onClick}
      >{`Button #${id}`}</button>
    ));

    return <div className="App">{buttons}</div>;
  }
  */





export default App