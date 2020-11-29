import React, { Component } from "react";
import "./home.css";
import Codeaudio from "./audio";
import Keyboard from "./keyboard";

export default class home extends Component {
  flag = 0;

  handleKeyPress = (e) => {
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!key) return;
    if (!this.flag) {
      this.flag = 1;
      const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
      if (!key) return;
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      if (!audio) return;
      key.classList.add("pressed");
      audio.play();
      setTimeout(() => {
        key.classList.remove("pressed");
        audio.currentTime = 0;
        audio.pause();
        this.flag = 0;
      }, 1000);
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    return (
      <React.Fragment>
        <Keyboard page="home"></Keyboard>
        <Codeaudio></Codeaudio>
      </React.Fragment>
    );
  }
}
