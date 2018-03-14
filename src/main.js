import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import {Menu} from 'semantic-ui-react'
import store from './store'
import MyMap from './components/MyMap'
import connect from './components/Connect'
import Myform from './components/MyForm'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={MyMap}/>
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById('root'));

