import axios from 'axios'

export const showDcsOnly = (dispatch, bounds, alarms) => {
    return dispatch({
        type: 'SHOW_DCS_ONLY',
        payload: axios.post('http://localhost:8080/api/equipments/dcs', bounds)
            .then(({data}) => {
                const dataMap = new Map()
                let alarms = data.alarms
                let bounds= data.bounds
                console.log(data)
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
                return {dataMap, alarms , bounds}

            })

            .catch(function (error) {
                console.log(error)
            })


    })
}