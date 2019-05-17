import {
   SET_AMOUNT_FROM,
   SET_AMOUNT_TO,
   SET_CURRENCY_RATES,
   SET_CURRENCY_FROM,
   SET_CURRENCY_TO,
   SET_START_DATE,
   SET_END_DATE} from './actions'

const defaultState = {
  amountFrom: '',
  amountTo: '',
  currencyFrom: '',
  currencyTo: '',
  startDate: '',
  endDate: '',
  rates: {
    EUR: 1,
  },
}

export const calculateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_AMOUNT_FROM:
      return {
        ...state,
        amountFrom: action.payload,
      }
    case SET_AMOUNT_TO:
      return {
        ...state,
        amountTo: action.payload
      }
    case SET_CURRENCY_RATES:
      return {
        ...state,
        rates: action.payload
      }

    case SET_CURRENCY_FROM:
      return {
        ...state,
        currencyFrom: action.payload
    }

    case SET_CURRENCY_TO:
      return {
        ...state,
        currencyTo: action.payload
      }
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload
      }
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload
      }
    default:
      return {
        ...state
    }

  }
}
