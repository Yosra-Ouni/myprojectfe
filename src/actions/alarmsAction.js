import axios from "axios/index";

export const alarmsAction = (dispatch, deviceId, alarms) => {
    return dispatch({
        type: 'ALARMS_ACTION',
        payload: axios.post('http://localhost:8080/api/equipments/alarms', deviceId)
            .then(({data}) => {
                let alarms = data.alarms
                    return {alarms, deviceId}
                }
            ).catch(function (error) {
                console.log(error)
            })
    })
}
