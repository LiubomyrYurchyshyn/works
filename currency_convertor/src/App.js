import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers';
import Header from './components/header/Header';
import './App.css';
import CurrencyExchangeRate from './components/currency_exchange_rate/CurrencyExchangeRate'

const store = createStore(rootReducer)

class App extends React.Component {

dataServices = {
    GET: async (url) => {
      try {
        let response = await fetch(url)
        let data = await response.json()
        return data
      }
      catch (error) {
        console.log("Server unreachable")
      }
    }
}

render(){
  return (
    <Provider store = {store} >
      <Header />
      <div className = "container">
        <CurrencyExchangeRate className = 'CER' dataServices = {this.dataServices} />
      </div>
    </Provider>
  );
}
}

export default App;
