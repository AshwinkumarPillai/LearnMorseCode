import React, { Component } from "react";
import "./level.css";
import Audios from "./audio";
import Keyboard from "./keyboard";

export default class level extends Component {
  constructor(props) {
    super(props);
    // {level: 1, letters: [[{key: 'e' ,keycode: 69, morseCode: "_ . . _"},{key: 'e' ,keycode: 69, morseCode: "_ . . _"}],[...],[...],[...],.....] }
    let letters = JSON.parse(JSON.stringify(this.props.location.state.letters.slice(0, this.props.location.state.level)));
    let totalLevels = this.props.location.state.totalLevels;
    let non_letters = JSON.parse(
      JSON.stringify(this.props.location.state.letters.slice(this.props.location.state.level, this.props.location.state.letters.length))
    );
    this.state = { level: this.props.location.state.level, letters, non_letters, progress: 0, totalLevels };
  }

  setProgress = (progress) => {
    this.setState({ progress });
  };

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center my-5">Tutorial &ndash; {this.state.level}</h1>
        <div className="level_content">
          <div className="progress">
            <div
              className="progress-bar bg-success"
              style={{ width: `${this.state.progress}%` }}
              role="progressbar"
              aria-valuenow=""
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="info_area">
            <button className="btn bg-success level_start">Start</button>
            <div className="info"></div>
          </div>
          <Keyboard
            page="level"
            setProgress={this.setProgress}
            letters={this.state.letters}
            level={this.state.level}
            non_letters={this.state.non_letters}
            totalLevels={this.state.totalLevels}
          />
        </div>
        <Audios />
      </React.Fragment>
    );
  }
}
