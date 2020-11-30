import React, { Component } from "react";
import "./keyboard.css";
import { withRouter } from "react-router-dom";
import { backend_url } from "../data";

class keyboard extends Component {
  questionare = [];
  currentCount = 0;
  totalCount = 0;
  currentKeyCode = 0;
  questionOn = 0;
  currIndex = 0;
  currentAudio;
  currLevel = 1;
  totalLevels = 20;
  url = backend_url;
  isLevel = false;

  constructor(props) {
    super(props);
    this.state = { letters: [], level: 0 };
  }

  handleKeyPressMobile = (keyCode) => {
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    if (!key) return;
    if (!this.flag) {
      this.flag = 1;
      const key = document.querySelector(`.key[data-key="${keyCode}"]`);
      if (!key) return;
      const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
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

  startLearning = () => {
    let info = document.querySelector(".info");
    let infoele = `<div class="info_text">Identify the sounds and press the keys on your keyboard corresponding to the sound</div>
    <div class="info_play"><button class="info_play_btn">Play Again <i class="fas fa-play"></i></button></div>`;
    info.innerHTML = "";
    info.insertAdjacentHTML("beforeend", infoele);
    document.querySelector(".info_play_btn").addEventListener("click", this.playCurrentSound);
    setTimeout(() => {
      this.playQuestion();
    }, 1000);
  };

  playCurrentSound = () => {
    if (this.questionOn) this.currentAudio.play();
  };

  playSound1 = () => {
    let arr = this.state.letters[this.state.level - 1];
    const audio = document.querySelector(`audio[data-key="${arr[0].keyCode}"]`);
    audio.play();
  };

  playSound2 = () => {
    let arr = this.state.letters[this.state.level - 1];
    const audio2 = document.querySelector(`audio[data-key="${arr[1].keyCode}"]`);
    audio2.play();
  };

  startLevel = () => {
    let startBtn = document.querySelector(".level_start");
    startBtn.remove();
    let info = document.querySelector(".info");
    let arr = this.state.letters[this.state.level - 1];
    const audio1 = document.querySelector(`audio[data-key="${arr[0].keyCode}"]`);
    const audio2 = document.querySelector(`audio[data-key="${arr[1].keyCode}"]`);
    let ele = `<div class="info_container">
        <div id="letter0"><span class="info_letter_label">Letter: </span> <span class="info_letter">${arr[0].key.toUpperCase()}</span> &nbsp;&nbsp;&nbsp; <span class="info_code_label">Code:  </span> &nbsp;&nbsp; <span class="info_code">${
      arr[0].morseCode
    }</span> &nbsp;&nbsp;&nbsp; <button class="btn playbtns">Play Sound <i class="fas fa-play"></i></button></div>
        <div id="letter1"><span class="info_letter_label">Letter: </span> <span class="info_letter">${arr[1].key.toUpperCase()}</span> &nbsp;&nbsp;&nbsp; <span class="info_code_label">Code:  </span> &nbsp;&nbsp; <span class="info_code">${
      arr[1].morseCode
    }</span> &nbsp;&nbsp;&nbsp; <button class="btn playbtns">Play Sound <i class="fas fa-play"></i></button></div>
    </div>`;
    info.insertAdjacentHTML("afterbegin", ele);
    let ele1 = document.getElementById("letter0");
    let ele2 = document.getElementById("letter1");
    ele1.addEventListener("click", this.playSound1);
    ele2.addEventListener("click", this.playSound2);

    setTimeout(() => {
      ele1.style.color = "red";
      audio1.play();
    }, 1000);
    setTimeout(() => {
      ele1.style.color = "black";
      ele2.style.color = "red";
      audio2.play();
    }, 2000);
    setTimeout(() => {
      ele2.style.color = "black";
      let newBtn = '<div class="begin_container"><button class="beginBtn btn btn-success text-center">BEGIN</button>';
      info.insertAdjacentHTML("beforeend", newBtn);
      document.querySelector(".beginBtn").addEventListener("click", this.startLearning);
    }, 3000);
  };

  playQuestion = () => {
    // console.log(this.questionare, this.currentCount, this.totalCount);
    let min = 0;
    let max = this.questionare.length - 1;
    this.currIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    this.currentKeyCode = this.questionare[this.currIndex].keyCode;
    this.currentAudio = this.questionare[this.currIndex].audio;
    this.questionare[this.currIndex].audio.play();
    this.questionOn = 1;
  };

  finishLevel = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    if (!user) this.props.history.push("/");
    let complete = document.getElementById("complete");
    if (this.currLevel < user.level || this.currLevel === this.totalLevels) {
      complete.style.display = "flex";
      setTimeout(() => {
        complete.style.display = "none";
        this.props.history.push("/tutorials");
      }, 1700);
      return;
    }
    let data = { email: user.email, level: user.level + 1 };

    let val = await fetch(this.url + "setLevel", {
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    let content = await val.json();
    if (content.status === 200) {
      user.level = content.details.level;
      await localStorage.setItem("user", JSON.stringify(user));
      complete.style.display = "flex";
      setTimeout(() => {
        complete.style.display = "none";
        this.props.history.push("/tutorials");
      }, 1700);
    }
  };

  handleQuestion = (keyCode) => {
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if (!key || !audio) return;
    if (this.questionOn) {
      this.questionOn = 0;
      key.classList.add("pressed");
      if (keyCode === this.currentKeyCode) {
        key.classList.add("greenBtn");
        this.currentCount++;
        if (++this.questionare[this.currIndex].count === 5) {
          this.questionare[this.currIndex].audio.remove();
          key.style.opacity = ".3";
          this.questionare.splice(this.currIndex, 1);
        }
      } else {
        key.classList.add("redBtn");
        this.questionare[this.currIndex].count = Math.max(0, this.questionare[this.currIndex].count - 1);
        this.questionare.forEach((obj) => {
          if (obj.keyCode === keyCode) obj.count = Math.max(0, obj.count - 1);
        });
        this.currentCount = Math.max(0, this.currentCount - 2);
      }
      let progress = (this.currentCount / this.totalCount) * 100;

      this.props.setProgress(progress);

      setTimeout(() => {
        key.classList.remove("pressed");
        key.classList.remove("greenBtn");
        key.classList.remove("redBtn");
      }, 400);

      if (this.currentCount === this.totalCount) {
        this.finishLevel();
        return;
      }

      setTimeout(() => {
        this.playQuestion();
      }, 1000);
    }
  };

  clickAnsQuestion = (e) => {
    let keyCode = parseInt(e.currentTarget.getAttribute("data-key"));
    if (this.isLevel) {
      this.handleQuestion(keyCode);
    } else {
      this.handleKeyPressMobile(keyCode);
    }
  };

  ansQuestion = (e) => {
    this.handleQuestion(e.keyCode);
  };

  componentDidMount() {
    let ele = document.querySelector(".keys__container");
    if (this.props.page === "level") {
      ele.classList.add("level_keyboard");
    } else {
      ele.style.marginTop = "50px";
      ele.classList.remove("level_keyboard");
    }

    //  ---- for level component
    if (this.props.letters) {
      this.isLevel = true;
      this.currLevel = this.props.level;
      this.totalLevels = this.props.totalLevels;
      let levelStart = document.querySelector(".level_start");
      if (!levelStart) {
        this.props.history.push("/tutorials");
        return;
      }
      levelStart.addEventListener("click", this.startLevel);
      let letters = this.props.letters;
      this.setState({ letters: JSON.parse(JSON.stringify(letters)), level: this.props.level });
      document.querySelectorAll(".key").forEach((ele) => {
        ele.style.opacity = ".3";
      });

      for (let letterArr of letters) {
        const key1 = document.querySelector(`.key[data-key="${letterArr[0].keyCode}"]`);
        const key2 = document.querySelector(`.key[data-key="${letterArr[1].keyCode}"]`);
        key1.style.opacity = "1";
        key2.style.opacity = "1";
        const audio1 = document.querySelector(`audio[data-key="${letterArr[0].keyCode}"]`);
        const audio2 = document.querySelector(`audio[data-key="${letterArr[1].keyCode}"]`);
        this.questionare.push({ audio: audio1, key: key1, keyCode: letterArr[0].keyCode, count: 0 });
        this.questionare.push({ audio: audio2, key: key2, keyCode: letterArr[1].keyCode, count: 0 });
        this.totalCount += 10;
      }

      let non_letters = this.props.non_letters;
      for (let letterArr of non_letters) {
        const audio1 = document.querySelector(`audio[data-key="${letterArr[0].keyCode}"]`);
        const audio2 = document.querySelector(`audio[data-key="${letterArr[1].keyCode}"]`);
        if (!audio1) {
          this.props.history.push("/tutorials");
          return;
        }
        audio1.remove();
        audio2.remove();
      }

      window.addEventListener("keydown", this.ansQuestion);
    }
    // ----  for level component
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.ansQuestion);
  }

  render() {
    return (
      <React.Fragment>
        <div className="complete" id="complete">
          Hurray! Level Complete
        </div>
        <div className="keys__container">
          <div className="keys keys_number">
            <div className="key" onClick={this.clickAnsQuestion} data-key="49">
              <kbd>1</kbd>
              <span className="morse_code">. _ _ _ _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="50">
              <kbd>2</kbd>
              <span className="morse_code">. . _ _ _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="51">
              <kbd>3</kbd>
              <span className="morse_code">. . . _ _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="52">
              <kbd>4</kbd>
              <span className="morse_code">. . . . _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="53">
              <kbd>5</kbd>
              <span className="morse_code">. . . . .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="54">
              <kbd>6</kbd>
              <span className="morse_code">_ . . . .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="55">
              <kbd>7</kbd>
              <span className="morse_code">_ _ . . .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="56">
              <kbd>8</kbd>
              <span className="morse_code">_ _ _ . .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="57">
              <kbd>9</kbd>
              <span className="morse_code">_ _ _ _ .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="48">
              <kbd>0</kbd>
              <span className="morse_code">_ _ _ _ _</span>
            </div>
          </div>
          <div className="keys keys_top">
            <div className="key" onClick={this.clickAnsQuestion} data-key="81">
              <kbd>Q</kbd>
              <span className="morse_code">_ _ . _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="87">
              <kbd>W</kbd>
              <span className="morse_code">. _ _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="69">
              <kbd>E</kbd>
              <span className="morse_code">.</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="82">
              <kbd>R</kbd>
              <span className="morse_code">. _ .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="84">
              <kbd>T</kbd>
              <span className="morse_code">_</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="89">
              <kbd>Y</kbd>
              <span className="morse_code">_ . _ _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="85">
              <kbd>U</kbd>
              <span className="morse_code">. . _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="73">
              <kbd>I</kbd>
              <span className="morse_code">. .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="79">
              <kbd>O</kbd>
              <span className="morse_code">_ _ _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="80">
              <kbd>P</kbd>
              <span className="morse_code">. _ _ .</span>
            </div>
          </div>

          <div className="keys keys_middle">
            <div className="key" onClick={this.clickAnsQuestion} data-key="65">
              <kbd>A</kbd>
              <span className="morse_code">. _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="83">
              <kbd>S</kbd>
              <span className="morse_code">. . .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="68">
              <kbd>D</kbd>
              <span className="morse_code">_ . .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="70">
              <kbd>F</kbd>
              <span className="morse_code">. . _ .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="71">
              <kbd>G</kbd>
              <span className="morse_code">_ _ .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="72">
              <kbd>H</kbd>
              <span className="morse_code">. . . .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="74">
              <kbd>J</kbd>
              <span className="morse_code">. _ _ _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="75">
              <kbd>K</kbd>
              <span className="morse_code">_ . _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="76">
              <kbd>L</kbd>
              <span className="morse_code">. _ . .</span>
            </div>
          </div>
          <div className="keys keys_bottom">
            <div className="key" onClick={this.clickAnsQuestion} data-key="90">
              <kbd>Z</kbd>
              <span className="morse_code">_ _ . .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="88">
              <kbd>X</kbd>
              <span className="morse_code">_ . . _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="67">
              <kbd>C</kbd>
              <span className="morse_code">_ . _ .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="86">
              <kbd>V</kbd>
              <span className="morse_code">. . . _</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="66">
              <kbd>B</kbd>
              <span className="morse_code">_ . . .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="78">
              <kbd>N</kbd>
              <span className="morse_code">_ .</span>
            </div>
            <div className="key" onClick={this.clickAnsQuestion} data-key="77">
              <kbd>M</kbd>
              <span className="morse_code">_ _</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(keyboard);
