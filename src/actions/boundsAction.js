import axios from 'axios'

export const boundsAction = (dispatch, bounds, data1) => {
    return dispatch({
        type: 'BOUNDS_ACTION',
        payload: axios.post("http://localhost:8080/api/equipments/all", bounds)
            .then(({data} )=>
        {
            let myMap = new Map()
            data.map((equipment, index) => {
                if (!myMap.has(equipment.gps)) {
                    dataMap.set(equipment.gps, [].push(equipment))
                } else {
                    dataMap.set(equipment.gps, push(equipment))
                }

            })
            return myMap

        })

})


}
