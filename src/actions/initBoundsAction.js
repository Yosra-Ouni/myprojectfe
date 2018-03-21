import axios from 'axios'

export const initBoundsAction = (dispatch, bounds) => {
    return dispatch({
        type: 'INIT_BOUNDS_ACTION',
        payload: axios.post('http://localhost:8080/api/equipments/all', bounds)
            .then(({data}) => {
                const dataMap = new Map()
                data.devices.map((equipment, index) => {
                    console.log(equipment)
                    let key = equipment.gps
                    if (!(dataMap.has(key))) {
                        let values = []
                        values.push(equipment)
                        dataMap.set(key, values)
                        console.log(values)
                    } else {
                        let values = dataMap.get(key)
                        values.push(equipment)
                        dataMap.set(key, values)
                    }

                })
                return dataMap
            })
            .catch(function (error) {
                console.log(error)
            })


    })
}