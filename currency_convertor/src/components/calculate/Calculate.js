import React from 'react';
import {connect} from 'react-redux';
import SelectCurrency from '../subordinate/SelectCurrency';
import TextField from '../subordinate/TextField.js';
import ChangeButton from '../subordinate/ChangeButton.js';
import {setAmountFrom, setAmountTo, setCurrencyRates, setCurrencyFrom, setCurrencyTo} from '../../store/calculate/actions'

// document.getElementById(id).getElementsByTagName('p')[0].innerHTML
// document.getElementById('amount to').value


class Calculate extends React.Component {

  onAmountFrom = (event) => {
    let amountFrom = event.target.value
    this.props.setAmountFrom(amountFrom)
  }

  onAmountTo = (amountTo) => {
    document.getElementById('amount to').value = amountTo
    this.props.setAmountTo(amountTo)
  }

  onCurrencyRateSet = async () => {
    let data = await this.props.dataServices.GET("https://api.exchangeratesapi.io/latest")
    data.rates.EUR = 1
    this.props.setCurrencyRates(data.rates)
  }

  getCurrencyById = (id) => {
    let currency = document.getElementById(id).getElementsByTagName('p')[0].innerHTML
    return currency
  }

  getCurrencyFrom = (value) => {
    this.onSetCurrencyFrom(value)
  }

  getCurrencyTo = (value) => {
    this.onSetCurrencyTo(value)
  }

  onSetCurrencyFrom = (currencyFrom) => {
    this.props.setCurrencyFrom(currencyFrom)
  }

  onSetCurrencyTo = (currencyTo) => {
    this.props.setCurrencyTo(currencyTo)
  }

  setCurrencyFrom = (currencyFrom) => {
    document.getElementById('currency from').getElementsByTagName('p')[0].innerHTML = currencyFrom
    this.props.setGraphArray()
  }

  setCurrencyTo = (currencyTo) => {
    document.getElementById('currency to').getElementsByTagName('p')[0].innerHTML = currencyTo
    this.props.setGraphArray()
  }

  round = (value, decimals) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

  calculateCurrency = async () => {
    await this.onCurrencyRateSet()

    let currencyFrom = this.props.currencyFrom
    let currencyTo = this.props.currencyTo

    if (currencyFrom !== 'Currency from' && currencyTo !== 'Currency to') {
      let currencyFromValue = this.props.rates[currencyFrom]
      let currencyToValue = this.props.rates[currencyTo]
      let amountToValue = currencyToValue / currencyFromValue * this.props.amountFrom
      let result = this.round(amountToValue, 2)
      let check = result.toString()
      check.length < 13 ? this.onAmountTo(result) : void 0
    }
    else {
      this.onAmountTo('')
    }
  }

  changeCurrency = () => {
    const {currencyFrom, currencyTo} = this.props

    if (currencyFrom !== 'Currency from' && currencyTo !== 'Currency to' && currencyFrom !== '' && currencyTo !== '') {
      let currencyFrom = this.getCurrencyById('currency from')
      let currencyTo = this.getCurrencyById('currency to')

      this.onSetCurrencyFrom(currencyTo)
      this.onSetCurrencyTo(currencyFrom)

      this.setCurrencyFrom(currencyTo)
      this.setCurrencyTo(currencyFrom)

      this.props.setGraphArray()
    }
  }

  render() {
    return(
      <div className = "calculate">
        <TextField placeholder = "Amount from" id = "amount from" calculateCurrency = {this.calculateCurrency} onAmountFrom = {this.onAmountFrom}/>
        <SelectCurrency placeholder = "Currency from" id = "currency from" calculateCurrency = {this.calculateCurrency} setGraphArray = {this.props.setGraphArray} getCurrency =  {this.onSetCurrencyFrom}/>
        <ChangeButton changeCurrency = {this.changeCurrency} calculateCurrency = {this.calculateCurrency} setGraphArray = {this.setGraphArray}/>
        <SelectCurrency placeholder = "Currency to" id = "currency to" calculateCurrency = {this.calculateCurrency} setGraphArray = {this.props.setGraphArray} getCurrency =  {this.onSetCurrencyTo} />
        <div className = "amount-to" >
          <input placeholder = "Amount to" id = "amount to" readOnly = {true} max = "12" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    amountFrom: state.calculate.amountFrom,
    amountTo: state.calculate.amountTo,
    rates: state.calculate.rates,
    currencyFrom: state.calculate.currencyFrom,
    currencyTo: state.calculate.currencyTo
  }
}

const mapDispatchToProps = {
  setAmountFrom,
  setAmountTo,
  setCurrencyRates,
  setCurrencyFrom,
  setCurrencyTo
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculate)
