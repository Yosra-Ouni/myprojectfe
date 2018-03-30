import axios from "axios/index";

export const alarmsAction = (dispatch, deviceId, alarms) => {
    return dispatch({
        type: 'ALARMS_ACTION',
        payload: {alarms, deviceId}
    })
}
