import axios from 'axios'

export const initBoundsAction = (dispatch, bounds, alarms) => {
    return dispatch({
        type: 'INIT_BOUNDS_ACTION',
        payload: axios.post('http://localhost:8080/api/equipments/all', bounds)
            .then(({data}) => {
                const dataMap = new Map()
                let alarms = data.alarms
                data.devices.map((equipment, index) => {
                   // console.log(equipment)
                    let key = equipment.gps
                    if (!(dataMap.has(`${key.lat},${key.lng}`))) {
                        let values = []
                        values.push(equipment)
                        dataMap.set(`${key.lat},${key.lng}`, values)
                        //console.log(values)
                    } else {
                        let values = dataMap.get(`${key.lat},${key.lng}`)
                        values.push(equipment)
                        dataMap.set(`${key.lat},${key.lng}`, values)
                    }

                })
                return {dataMap, alarms}

            })

            .catch(function (error) {
                console.log(error)
            })


    })
}