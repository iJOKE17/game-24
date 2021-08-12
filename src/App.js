import './App.css';

import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: 0,
      selectFirstNumbers: { number: 0, index: 0 },
      selectSecondNumbers: { number: 0, index: 0 },
      selectOperation: null,
      disableOperation: false,
      mathUp: {
        '+': function (x, y) { return x + y },
        '-': function (x, y) { return x - y },
        '*': function (x, y) { return x * y },
        '/': function (x, y) { return x / y }
      },
      buttonsDisplay: [
        {
          show: true,
          value: 0
        },
        {
          show: true,
          value: 0
        },
        {
          show: true,
          value: 0
        },
        {
          show: true,
          value: 0
        }
      ],
      buttonsInit: [
        {
          show: true,
          value: 0
        },
        {
          show: true,
          value: 0
        },
        {
          show: true,
          value: 0
        },
        {
          show: true,
          value: 0
        }
      ]
    };
  }

  componentDidMount = async () => {
    const randomNumbers = this.createRandomNumber()
    await this.setState({
      buttonsDisplay: [
        {
          show: true,
          value: randomNumbers[0]
        },
        {
          show: true,
          value: randomNumbers[1]
        },
        {
          show: true,
          value: randomNumbers[2]
        },
        {
          show: true,
          value: randomNumbers[3]
        }
      ],
      buttonsInit: [
        {
          show: true,
          value: randomNumbers[0]
        },
        {
          show: true,
          value: randomNumbers[1]
        },
        {
          show: true,
          value: randomNumbers[2]
        },
        {
          show: true,
          value: randomNumbers[3]
        }
      ],
    })
  }

  createRandomNumber = () => {
    const numbers = [];
    while (numbers.length < 4) {
      const random = Math.floor(Math.random() * (9 - 1) + 1)
      if (numbers.indexOf(random) === -1) numbers.push(random);
    }
    return numbers
  }

  handleClickOperation = async (operation) => {
    if (operation === 'c') {
      const buttonsInit = this.state.buttonsInit
      await this.setState({
        buttonsDisplay: buttonsInit,
        selectFirstNumbers: { number: 0, index: 0 },
        selectSecondNumbers: { number: 0, index: 0 },
        selectOperation: null
      })
      return
    }
    if (!this.state.selectFirstNumbers.number && !this.state.selectSecondNumbers.number) {
      alert("Please select number")
      return
    }
    await this.setState({ selectOperation: operation })
  }

  handleClick = async (number, index) => {
    if (!this.state.selectFirstNumbers.number || (this.state.selectFirstNumbers.number && !this.state.selectOperation && !this.state.selectSecondNumbers.number)) {
      await this.setState({ selectFirstNumbers: { number, index } })
    }
    if (this.state.selectFirstNumbers.number && this.state.selectOperation) {
      await this.setState({ selectSecondNumbers: { number, index } })

      const total = this.state.mathUp[this.state.selectOperation](this.state.selectFirstNumbers.number, this.state.selectSecondNumbers.number)
      const buttonsDisplay = this.state.buttonsDisplay

      buttonsDisplay[this.state.selectFirstNumbers.index].show = false
      buttonsDisplay[this.state.selectSecondNumbers.index].value = total

      await this.setState({
        buttonsDisplay: buttonsDisplay,
        selectFirstNumbers: { number: 0, index: 0 },
        selectSecondNumbers: { number: 0, index: 0 },
        selectOperation: null
      })

      const filterDisplay = this.state.buttonsDisplay.filter(button => button.show)
      if (filterDisplay.length === 1) {
        filterDisplay[0].value === 24 ? alert("Bravo") : alert("Try again")
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="text-header">Game 24</div>
        <div className="game-container">
          <div className="display-flex">
            <button
              className="button-display-number"
              disabled={!this.state.buttonsDisplay[0].show}
              onClick={() => this.handleClick(this.state.buttonsDisplay[0].value, 0)}>
              {this.state.buttonsDisplay[0].value}
            </button>
            <button
              className="button-display-number"
              disabled={!this.state.buttonsDisplay[1].show}
              onClick={() => this.handleClick(this.state.buttonsDisplay[1].value, 1)}>
              {this.state.buttonsDisplay[1].value}
            </button>
          </div>
          <div className="display-flex">
            <button
              className="button-display-number"
              disabled={!this.state.buttonsDisplay[2].show}
              onClick={() => this.handleClick(this.state.buttonsDisplay[2].value, 2)}>
              {this.state.buttonsDisplay[2].value}
            </button>
            <button
              className="button-display-number"
              disabled={!this.state.buttonsDisplay[3].show}
              onClick={() => this.handleClick(this.state.buttonsDisplay[3].value, 3)}>
              {this.state.buttonsDisplay[3].value}
            </button>
          </div>
          <div className="display-flex">
            <button
              className="button-display-operation"
              disabled={this.state.disableOperation}
              onClick={() => this.handleClickOperation("+")}>
              +
            </button>
            <button
              className="button-display-operation"
              disabled={this.state.disableOperation}
              onClick={() => this.handleClickOperation("-")}>
              -
            </button>
            <button
              className="button-display-operation"
              disabled={this.state.disableOperation}
              onClick={() => this.handleClickOperation("*")}>
              *
            </button>
            <button
              className="button-display-operation"
              disabled={this.state.disableOperation}
              onClick={() => this.handleClickOperation("/")}>
              /
            </button>
            <button
              className="button-display-operation"
              onClick={() => this.handleClickOperation("c")}>
              C
            </button>
          </div>
          <div className="text-header">
            {/* Answer: {this.state.answer} */}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
