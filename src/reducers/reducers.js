import { combineReducers } from 'redux'
import mainReducer from './mainReducer'
import {routerReducer } from 'react-router-redux'
import {reducer as toastrReducer} from 'react-redux-toastr'
const reducers = combineReducers({
    mainReducer,toastr: toastrReducer
});
export default reducers