import { combineReducers } from 'redux'
import mainReducer from './mainReducer'
import reducer from './reducer'
//import MarkerReducer from './MarkerReducer'
import {routerReducer } from 'react-router-redux'

const reducers = combineReducers({

    mainReducer , reducer
});

export default reducers