import axios from 'axios'

export const initBoundsAction = (dispatch, bounds, data1) => {
    return dispatch({
        type: 'INIT_BOUNDS_ACTION',
        payload: axios.post('http://localhost:8080/api/equipments/all', bounds)
            .catch(function () {
                console.log(response)
            })
    })
}