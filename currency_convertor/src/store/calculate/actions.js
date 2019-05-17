export const SET_AMOUNT_FROM = 'SET_AMOUNT_FROM'
export const SET_AMOUNT_TO = 'SET_AMOUNT_TO'
export const SET_CURRENCY_RATES = 'SET_CURRENCY_RATES'
export const SET_CURRENCY_FROM = 'SET_CURRENCY_FROM'
export const SET_CURRENCY_TO = 'SET_CURRENCY_TO'
export const SET_START_DATE = 'SET_START_DATE'
export const SET_END_DATE = 'SET_END_DATE'

export const setAmountFrom = amountFrom => ({
  type: SET_AMOUNT_FROM,
  payload: amountFrom
})

export const setAmountTo = amountTo => ({
  type: SET_AMOUNT_TO,
  payload: amountTo
})

export const setCurrencyRates = rates => ({
  type: SET_CURRENCY_RATES,
  payload: rates
})

export const setCurrencyFrom = currencyFrom => ({
  type: SET_CURRENCY_FROM,
  payload: currencyFrom
})

export const setCurrencyTo = currencyTo => ({
  type: SET_CURRENCY_TO,
  payload: currencyTo
})

export const setStartDate = startDate => ({
  type: SET_START_DATE,
  payload: startDate
})

export const setEndDate = endDate => ({
  type: SET_END_DATE,
  payload: endDate
})
