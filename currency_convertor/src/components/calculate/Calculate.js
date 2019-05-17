import React from 'react';
import {connect} from 'react-redux';
import SelectCurrency from '../subordinate/SelectCurrency';
import TextField from '../subordinate/TextField.js';
import ChangeButton from '../subordinate/ChangeButton.js';
import {setAmountFrom, setAmountTo, setCurrencyRates, setCurrencyFrom, setCurrencyTo} from '../../store/calculate/actions'

class Calculate extends React.Component {

  onAmountFrom = () => {
    let amountFrom = document.getElementById('amount from').value
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

  getCurrency = (id) => {
    let currency = document.getElementById(id).querySelector(".MuiTypography-root-46").innerHTML
    return currency
  }

  onSetCurrencyFrom = (currencyFrom) => {
    this.props.setCurrencyFrom(currencyFrom)
    this.props.setGraphArray()
  }

  onSetCurrencyTo = (currencyTo) => {
    this.props.setCurrencyTo(currencyTo)
    this.props.setGraphArray()
  }

  setCurrency = (id, currency) => {
    document.getElementById(id).querySelector(".MuiTypography-root-46").innerHTML = currency
    this.props.setGraphArray()
  }

  round = (value, decimals) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

  calculateCurrency = async () => {
    await this.onCurrencyRateSet()

    let currencyFrom = this.getCurrency('currency from')
    let currencyTo = this.getCurrency('currency to')
    this.onSetCurrencyFrom(currencyFrom)
    this.onSetCurrencyTo(currencyTo)

    let currencyFromValue = this.props.rates[currencyFrom]
    if (currencyFrom !== 'Currency from' && currencyTo !== 'Currency to' && currencyFromValue !== '') {
      let currencyToValue = this.props.rates[currencyTo]
      this.onAmountFrom()
      let amountToValue = currencyToValue / currencyFromValue * this.props.amountFrom
      let result = this.round(amountToValue, 2)
      this.onAmountTo(result)
    }
    else {
      this.onAmountTo('')
    }
  }

  changeCurrency = () => {
    let currencyFrom = this.getCurrency('currency from')
    let currencyTo = this.getCurrency('currency to')
    if (currencyFrom !== 'Currency from' && currencyTo !== 'Currency to') {
      this.setCurrency('currency from', currencyTo)
      this.setCurrency('currency to', currencyFrom)

      this.props.setCurrencyFrom(currencyFrom)
      this.props.setCurrencyTo(currencyTo)

      this.props.setGraphArray()
    }
  }

  render() {
    return(
      <div className = "calculate">
        <TextField placeholder = "Amount from" id = "amount from" calculateCurrency = {this.calculateCurrency}/>
        <SelectCurrency placeholder = "Currency from" id = "currency from" calculateCurrency = {this.calculateCurrency} setGraphArray = {this.props.setGraphArray} />
        <ChangeButton changeCurrency = {this.changeCurrency} calculateCurrency = {this.calculateCurrency}/>
        <SelectCurrency placeholder = "Currency to" id = "currency to" calculateCurrency = {this.calculateCurrency} setGraphArray = {this.props.setGraphArray} />
        <TextField placeholder = "Amount to" id = "amount to" readOnly = {true} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    amountFrom: state.calculate.amountFrom,
    amountTo: state.calculate.amountTo,
    rates: state.calculate.rates
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
