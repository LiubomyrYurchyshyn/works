import {combineReducers} from 'redux';
import {calculateReducer} from './calculate/reducers';

export default combineReducers ({
  calculate: calculateReducer,
})
