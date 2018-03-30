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
                //data1: {$set: action.payload.data.devices},
                dataMap :{$set: action.payload}

            })
        }
        case  "INIT_BOUNDS_ACTION_FULFILLED": {
            return update(state, {
                bounds: {$set: action.bounds},
                dataMap :{$set: action.payload.dataMap},
                alarms:{$set: action.payload.alarms}
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
        case 'SHOW_NOTIFICATION_ACTION' :{
            return update(state, {
                showNotif: {$set: action.payload.showNotif},
                msg:{$set: action.payload.msg}
            })
        }
        case  'ALARMS_ACTION' : {
            return update(state, {
                deviceId: {$set: action.payload.deviceId},
                alarms:{$set: action.payload.alarms}
            })

        }
        case 'SHOW_HIDE_ALARMS_MODAL_ACTION':{
            return update(state, {
                showActionModal: {$set: action.payload.showActionModal},
                device:{$set: action.payload.device}
            })
        }


        default:
            return state
    }
}
export default mainReducer