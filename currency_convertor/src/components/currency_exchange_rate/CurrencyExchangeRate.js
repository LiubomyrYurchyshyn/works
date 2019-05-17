import React from 'react';
import {connect} from 'react-redux';
import { Line } from 'react-chartjs-2';
import DateInput from '../subordinate/DateInput';
import Calculate from '../calculate/Calculate';

import {setAmountFrom, setAmountTo, setCurrencyRates, setCurrencyFrom, setCurrencyTo, setStartDate, setEndDate} from '../../store/calculate/actions'

class CurrencyExchangeRate extends React.Component {

  state = {
    data: {
      datasets:[{
        label: '',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointRadius: 0,
        data: this.props.data
      }]
    }
  }

  options = {
    onClick: this.handleChange,
    responsive: true,
    title: {
      display: true,
      text: ""
    },
    scales: {
      xAxes: [{
        type: "time",
        time: {
          parser: 'DD-MM-YYYY',
        },
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
      yAxes: [{
        scaleLabel: {
        display: true,
        labelString: 'value'
        }
      }]
    }
  }

  legend = {
    display: false
  }

  updateGraph = (data) => {
    this.setState({
      data: {
        datasets:[{
          label: '',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointRadius: 0,
          data: data
        }]
      }
    });
  }

  setGraphArray = async () => {
    const {dataServices, currencyFrom, currencyTo, startDate, endDate} = this.props

    if(currencyFrom !== 'Currency from' && currencyTo !== 'Currency to' && currencyFrom !== '' && currencyTo !== '' ) {
      const response = await dataServices.GET("https://api.exchangeratesapi.io/history?start_at=" + startDate + "&end_at=" + endDate)
      const rates = response.rates
      let data = []

      for (var prop in rates) {
        rates[prop]['EUR']=1
        data.push({x: prop.split('-').reverse().join('-'), y: rates[prop][currencyTo]/rates[prop][currencyFrom]})
      }

      data.sort(function(a, b){
        var aa = a.x.split('-').reverse().join(),
            bb = b.x.split('-').reverse().join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
      })

      this.updateGraph (data)
    }
  }

  render() {
    return (
      <div>
        <Calculate dataServices = {this.props.dataServices} setGraphArray = {this.setGraphArray} />
        <div className = "ce-rate">
          <div className = "date-input">
            <div className = "date-input-child">
              <h2>Choose date interval</h2>
              <DateInput label = {this.label} setGraphArray = {this.setGraphArray}/>
            </div>
          </div>
          <Line chart ref="chart"
            data={this.state.data}
            options={this.options}
            legend = {this.legend}
          />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencyFrom: state.calculate.currencyFrom,
    currencyTo: state.calculate.currencyTo,
    startDate: state.calculate.startDate,
    endDate: state.calculate.endDate
  }
}

const mapDispatchToProps = {
  setAmountFrom,
  setAmountTo,
  setCurrencyRates,
  setCurrencyFrom,
  setCurrencyTo,
  setStartDate,
  setEndDate
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyExchangeRate)
