import update from 'immutability-helper';
import hideDeviceAction from '../actions/showHideAlarmsModalAction';

const MarkerReducer = (state, action) => {
    switch (action.type) {
        case  "HIDE_DEVICE_ACTION": {

            /*let index = state.devices.map(device, index => {
                if (device.device === action.payload) {
                 update(state , {devices : {$set : on = false}})
                    return index
                }
            })*/

        }
        default:
            return state
    }
}
export default MarkerReducer