import React, { useEffect } from "react";

import Logo from "./assets/img/logo.png";

import Button from "./components/Button/index";
import Display from "./components/Display/index";

export default function App() {
  const [operation, setOperation] = React.useState(null);
  const [current, setCurrent] = React.useState(0);
  const [shouldClearDisplay, setShouldClearDisplay] = React.useState(false);
  const [values, setValues] = React.useState([0, 0]);
  const [displayValue, setDisplayValue] = React.useState(0);

  const calc = (num1, num2, operator) => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return 0;
    }
  };

  const setOperator = (operator) => {
    if (current === 0) {
      setCurrent(1);
      setOperation(operator);
      setShouldClearDisplay(true);
    } else {
      const equals = operator === "=";
      const currentOperation = operation;

      const numbers = values;

      try {
        numbers[0] = calc(numbers[0], numbers[1], currentOperation);
      } catch (e) {
        numbers[0] = values[0];
      }

      numbers[1] = 0;

      setDisplayValue(numbers[0]);
      setOperation(equals ? null : operator);
      setCurrent(equals ? 0 : 1);
      setShouldClearDisplay(!equals);
      setValues(numbers);
    }
  };

  const addDigit = (n) => {
    if (n === "." && displayValue.includes(".")) {
      return;
    }
    const clearDisplay = displayValue === 0 || shouldClearDisplay;

    const currentValue = clearDisplay ? "" : displayValue;
    const nextDisplayValue = currentValue + n;

    setDisplayValue(nextDisplayValue);
    setShouldClearDisplay(nextDisplayValue === "0");

    if (n !== ".") {
      const i = current;
      const formated = parseFloat(nextDisplayValue);
      const bindValues = values;
      bindValues[i] = formated;
      setValues(bindValues);
    }
  };

  const clearData = () => {
    setDisplayValue(0);
    setOperation(null);
    setCurrent(0);
    setShouldClearDisplay(true);
    setValues([0, 0]);
  };

  useEffect(() => {
    window.document.title = "ReCalculator";
  }, []);

  return (
    <div className="content-container">
      <div className="logo-container">
        <img src={Logo} width={32} height={32} alt="ReCalculator" />
        <h2 className="logoname">ReCalculator</h2>
      </div>

      <Display operator={operation} value={displayValue} />

      <div className="calculator">
        <Button label="AC" click={clearData} triple />
        <Button label="/" click={setOperator} operation />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button label="*" click={setOperator} operation />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button label="-" click={setOperator} operation />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button label="+" click={setOperator} operation />
        <Button label="0" click={addDigit} />
        <Button label="." click={addDigit} />
        <Button label="=" click={setOperator} double />
      </div>

      <p className="copy">
        {`© ReCalculator ${new Date().getFullYear()}, by Eliseu Campos - All rights reserved.`}
      </p>
    </div>
  );
}
