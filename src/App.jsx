import React, { Component } from "react";

import Logo from "./assets/img/logo.png";

import Button from "./components/Button/index";
import Display from "./components/Display/index";

const initState = {
  displayValue: 0,
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.clearData = this.clearData.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
    window.document.title = "ReCalculator";
  }

  state = { ...initState };

  clearData() {
    this.setState({ ...initState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }
    const clearDisplay =
      this.state.displayValue == 0 || this.state.clearDisplay;

    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;

    this.setState({
      displayValue,
      clearDisplay: displayValue > 0 ? false : clearDisplay,
    });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="content-container">
        <div className="logo-container">
          <img src={Logo} width={32} height={32} />
          <h2 className="logoname">ReCalculator</h2>
        </div>

        <Display
          operator={this.state.operation}
          value={this.state.displayValue}
        />

        <div className="calculator">
          <Button label="AC" click={this.clearData} triple />
          <Button label="/" click={this.setOperation} operation />
          <Button label="7" click={this.addDigit} />
          <Button label="8" click={this.addDigit} />
          <Button label="9" click={this.addDigit} />
          <Button label="*" click={this.setOperation} operation />
          <Button label="4" click={this.addDigit} />
          <Button label="5" click={this.addDigit} />
          <Button label="6" click={this.addDigit} />
          <Button label="-" click={this.setOperation} operation />
          <Button label="1" click={this.addDigit} />
          <Button label="2" click={this.addDigit} />
          <Button label="3" click={this.addDigit} />
          <Button label="+" click={this.setOperation} operation />
          <Button label="0" click={this.addDigit} />
          <Button label="." click={this.addDigit} />
          <Button label="=" click={this.setOperation} double />
        </div>
        <p className="copy">
          © ReCalculator {new Date().getFullYear()}, by Eliseu Campos - All
          rights reserved.
        </p>
      </div>
    );
  }
}
