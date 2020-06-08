import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initState = {
    displayValue: 0,
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component {
    constructor(props) {
        super(props)

        this.clearData = this.clearData.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    } 

    state = { ...initState }

    clearData () {
        this.setState({ ...initState })
    }

    setOperation (operation) {}

    addDigit (n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        console.log(n)
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n 
        
        this.setState({ displayValue, clearDisplay: false })
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearData} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} double/>
            </div>
        )
    }

}