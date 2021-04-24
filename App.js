import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    currentValueIndex: 0,
}

export default class App extends Component {
    state = { ...initialState }

    addDigit = digit => {
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        if(digit === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
            return
        }

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({ displayValue, clearDisplay: false })

        if(digit !== '.') {
            const newValue = parseFloat(displayValue)
            const values = [ ...this.state.values ]
            values[this.state.currentValueIndex] = newValue
            this.setState({ values })
        }
    }

    clearMemory = () => {
        this.setState({ ...initialState })
    }

    setOperation = operation => {
        if(this.state.currentValueIndex === 0) {
            this.setState({ operation, currentValueIndex: 1, clearDisplay: true })
        } else {
            const finish = operation === '='
            const currentOperation = this.state.operation
            const values = [ ...this.state.values ]
            
            try {
                if(currentOperation === '+') {
                    values[0] = values[0] + values[1]
                } else if (currentOperation === '-') {
                    values[0] = values[0] - values[1]
                } else if (currentOperation === '/') {
                    values[0] = values[0] / values[1]
                } else if (currentOperation === '*') {
                    values[0] = values[0] * values[1]
                } else {
                    values[0] = this.state.values[0]
                }
            } catch(error) {
                values[0] = this.state.values[0]
            }

            values[1] = 0
            this.setState({
                displayValue: `${values[0]}`,
                operation: finish ? null : operation,
                currentValueIndex: finish ? 0 : 1,
                clearDisplay: !finish,
                values: values
            })
        }
    }

    render() {
        <View style={styles.container}>
            <Display value={this.state.displayValue}></Display>
            <View style={styles.buttons}>
                <Button label='AC' onClick={this.clearMemory} triple></Button>
                <Button label='/' onClick={this.setOperation} operation></Button>
                <Button label='7' onClick={this.addDigit}></Button>
                <Button label='8' onClick={this.addDigit}></Button>
                <Button label='9' onClick={this.addDigit}></Button>
                <Button label='*' onClick={this.setOperation} operation></Button>
                <Button label='4' onClick={this.addDigit}></Button>
                <Button label='5' onClick={this.addDigit}></Button>
                <Button label='6' onClick={this.addDigit}></Button>
                <Button label='-' onClick={this.setOperation} operation></Button>
                <Button label='1' onClick={this.addDigit}></Button>
                <Button label='2' onClick={this.addDigit}></Button>
                <Button label='3' onClick={this.addDigit}></Button>
                <Button label='+' onClick={this.setOperation} operation></Button>
                <Button label='0' onClick={this.addDigit} double></Button>
                <Button label='.' onClick={this.addDigit}></Button>
                <Button label='=' onClick={this.setOperation} operation></Button>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})