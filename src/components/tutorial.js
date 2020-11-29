import React, { Component } from "react";
import "./tutorial.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  async componentDidMount() {
    let user = await JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You Must Login to continue");
      this.props.history.push("/login");
      return;
    }

    let cards = [];
    let arr = [
      [
        { key: "e", keyCode: 69, morseCode: "." },
        { key: "t", keyCode: 84, morseCode: "_" },
      ],
      [
        { key: "a", keyCode: 65, morseCode: ". _" },
        { key: "n", keyCode: 78, morseCode: "_ ." },
      ],
      [
        { key: "i", keyCode: 73, morseCode: ". ." },
        { key: "m", keyCode: 77, morseCode: "_ _" },
      ],
      [
        { key: "s", keyCode: 83, morseCode: ". . ." },
        { key: "o", keyCode: 79, morseCode: "_ _ _" },
      ],
      [
        { key: "d", keyCode: 68, morseCode: "_ . ." },
        { key: "u", keyCode: 85, morseCode: ". . _" },
      ],
      [
        { key: "r", keyCode: 82, morseCode: ". _ ." },
        { key: "k", keyCode: 75, morseCode: "_ . _" },
      ],
      [
        { key: "c", keyCode: 67, morseCode: "_ . _ ." },
        { key: "p", keyCode: 80, morseCode: ". _ _ ." },
      ],
      [
        { key: "b", keyCode: 66, morseCode: "_ . . ." },
        { key: "g", keyCode: 71, morseCode: "_ _ ." },
      ],
      [
        { key: "w", keyCode: 87, morseCode: ". _ _" },
        { key: "l", keyCode: 76, morseCode: ". _ . ." },
      ],
      [
        { key: "q", keyCode: 81, morseCode: "_ _ . _" },
        { key: "h", keyCode: 72, morseCode: ". . . ." },
      ],
      [
        { key: "f", keyCode: 70, morseCode: ". . _ ." },
        { key: "y", keyCode: 89, morseCode: "_ . _ _" },
      ],
      [
        { key: "z", keyCode: 90, morseCode: "_ _ . ." },
        { key: "v", keyCode: 86, morseCode: ". . . _" },
      ],
      [
        { key: "x", keyCode: 88, morseCode: "_ . . _" },
        { key: "j", keyCode: 74, morseCode: ". _ _ _" },
      ],
      [
        { key: "1", keyCode: 49, morseCode: ". _ _ _ _" },
        { key: "2", keyCode: 50, morseCode: ". . _ _ _" },
      ],
      [
        { key: "3", keyCode: 51, morseCode: ". . . _ _" },
        { key: "4", keyCode: 52, morseCode: ". . . . _" },
      ],
      [
        { key: "5", keyCode: 53, morseCode: ". . . . ." },
        { key: "6", keyCode: 54, morseCode: "_ . . . ." },
      ],
      [
        { key: "7", keyCode: 55, morseCode: "_ _ . . ." },
        { key: "8", keyCode: 56, morseCode: "_ _ _ . ." },
      ],
      [
        { key: "9", keyCode: 57, morseCode: "_ _ _ _ ." },
        { key: "0", keyCode: 48, morseCode: "_ _ _ _ _" },
      ],
    ];
    let index = 1;
    for (let a of arr) {
      let ele;
      if (index <= user.level) {
        ele = (
          <Link
            style={{ textDecoration: "none" }}
            className="col-sm-12 col-md-4 col-lg-3 level_cards"
            to={{ pathname: `/tutorial/${index}`, state: { level: index, letters: arr, totalLevels: arr.length } }}
            key={index}
          >
            <div className="tut_card_letters">
              <span style={{ color: "#ffa502" }}>{a[0].key}</span> <span>&</span> <span style={{ color: "#4cd137" }}>{a[1].key}</span>
            </div>
            <div className="tut_card_num">Tutorial {index++}</div>
          </Link>
        );
      } else {
        ele = (
          <div
            className="col-sm-12 col-md-4 col-lg-3 level_cards"
            to={{ pathname: `/tutorial/${index}`, state: { level: index, letters: arr } }}
            key={index}
          >
            <div className="locked">
              <i className="fas fa-lock"></i>
            </div>
            <div className="tut_card_letters">
              <span style={{ color: "#ffa502" }}>{a[0].key}</span> <span>&</span> <span style={{ color: "#4cd137" }}>{a[1].key}</span>
            </div>
            <div className="tut_card_num">Tutorial {index++}</div>
          </div>
        );
      }

      cards.push(ele);
    }
    this.setState({ cards });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container tut_container">
          <div className="row level_row">{this.state.cards}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(tutorial);
