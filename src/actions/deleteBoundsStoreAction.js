import axios from 'axios'

export const deleteBoundsStoreAction = (dispatch, bounds) => {
    return dispatch({
        type: 'DELETE_BOUNDS_STORE_ACTION',
        payload: axios.post('http://localhost:8080/api/equipments/delete', bounds)
    })
}