import axios from "axios/index";

export const allAlarmsAction = (dispatch,  alarms) => {
    return dispatch({
        type: 'ALL_ALARMS_ACTION',
        payload: axios.post('http://localhost:8080/api/alarms/all')
            .then(({data}) => {
                console.log(data)
                    let alarms = data

                    return {alarms}
                }
            ).catch(function (error) {
                console.log(error)
            })
    })
}