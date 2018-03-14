import axios from 'axios'

export const boundsAction = (dispatch, bounds, data1) => {
    return dispatch({
        type: 'BOUNDS_ACTION',
        payload: axios.post("http://localhost:8080/api/equipments/all", bounds)

    })
}