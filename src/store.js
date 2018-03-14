//import {initialData} from './data'


import {applyMiddleware, createStore} from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'
import {data} from './../initData'
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import reducers from "./reducers/reducers"
const middleware = composeWithDevTools(applyMiddleware(promise(), thunk))
//const store = createStore(reducers, data, middleware)
const store = createStore(reducers, data, middleware)
export default store

{/* import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import socketMiddleware from './socketMiddleware'

export default function configureStore(initialState) {
    return createStore(reducer, initialState,
        applyMiddleware(thunk, socketMiddleware)
    )
}
*/
}