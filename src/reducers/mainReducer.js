import update from 'immutability-helper';
import axios from 'axios'
import {data} from '../../initData.js' ;
import boundsAction from '../actions/boundsAction'
import initBoundsAction from '../actions/initBoundsAction'
import showModalAction from '../actions/showHideModalAction'

const mainReducer = (state = data, action) => {

    switch (action.type) {
        case 'TEST_ACTION':
            return update(state, {
                initialData: {$set: action.initialData}

            })
        case  "HIDE_DEVICE_ACTION": {
            return update(state, {
                device: {$set: action.payload}

            })
        }
        case  "BOUNDS_ACTION_FULFILLED": {
            console.log(action.payload)
            return update(state, {
                bounds: {$set: action.bounds},
                data1: {$set: action.payload.data.devices}

            })
        }
        case  "INIT_BOUNDS_ACTION_FULFILLED": {
            return update(state, {
                bounds: {$set: action.payload.data.bounds},
                data1: {$set: action.payload.data.devices}

            })
        }
        case  "SHOW_HIDE_MODAL_ACTION": {
            return update(state, {
                showModal: {$set: action.payload.showModal},
                device:{$set: action.payload.device}
            })
        }
        case "DISPLAY_EQUIPMENTS_ACTION" :{
            return update(state, {
                sameGps: {$set: action.payload}
            })
        }

        default:
            return state
    }
}
export default mainReducer