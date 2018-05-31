import update from 'immutability-helper'
import axios from 'axios'
import {data} from '../../initData.js'
import initBoundsAction from '../actions/initBoundsAction'
import showModalAction from '../actions/showHideModalAction'
import showDcsOnly from '../actions/showDcsOnly'
import showDevicesOnly from '../actions/showDcsOnly'


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
        case  "INIT_BOUNDS_ACTION_FULFILLED": {
            return update(state, {
                bounds: {$set: action.payload.bounds},
                dataMap: {$set: action.payload.dataMap},
                alarms: {$set: action.payload.alarms},
                initBoundActionFulField: {$set: true}
            })
        }
        case  "SHOW_DEVICES_ONLY_FULFILLED": {
            return update(state, {
                bounds: {$set: action.payload.bounds},
                dataMap: {$set: action.payload.dataMap},
                alarms: {$set: action.payload.alarms}
            })
        }
        case  "SHOW_DCS_ONLY_FULFILLED": {
            return update(state, {
                bounds: {$set: action.payload.bounds},
                dataMap: {$set: action.payload.dataMap},
                alarms: {$set: action.payload.alarms}
            })
        }
        case  "SHOW_HIDE_MODAL_ACTION": {
            return update(state, {
                showModal: {$set: action.payload.showModal},
                device: {$set: action.payload.device}
            })
        }
        case "DISPLAY_EQUIPMENTS_ACTION" : {
            return update(state, {
                sameGps: {$set: action.payload}
            })
        }
        case 'SHOW_NOTIFICATION_ACTION' : {
            return update(state, {
                showNotif: {$set: action.payload.showNotif},
                msg: {$set: action.payload.msg}
            })
        }
        case  'ALARMS_ACTION_FULFILLED' : {
            return update(state, {
                deviceId: {$set: action.payload.deviceId},
                alarms: {$set: action.payload.alarms}
            })

        }
        case 'ALL_ALARMS_ACTION_FULFILLED' : {
            return update(state, {
                alarms: {$set: action.payload.alarms}
            })
        }
        case 'SHOW_HIDE_ALARMS_MODAL_ACTION': {
            return update(state, {
                showActionModal: {$set: action.payload},
                //device:{$set: action.payload.device}
            })
        }
        case 'DELETE_BOUNDS_STORE_ACTION': {
            return null
        }
        case 'GLOBAL_NOTIFICATION_ACTION' : {
            return update(state, {
                showGlobalNotif: {$set: action.payload.showGlobalNotif},
                msg: {$set: action.payload.msg},
            })
        }
        case 'MARKER_POPUP_ACTION':{
            return update(state , {
                showPopup: {$set: action.payload.showPopup},
                deviceToPopup : {$set: action.payload.device},
            })
        }

        default:
            return state
    }
}
export default mainReducer