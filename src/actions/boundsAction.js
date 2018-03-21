import axios from 'axios'

export const boundsAction = (dispatch, bounds) => {
    return dispatch({
        type: 'BOUNDS_ACTION',
        payload: axios.post("http://localhost:8080/api/equipments/all", bounds)
            .then(({data}) => {
                const dataMap = new Map()
                data.devices.map((equipment, index) => {
                    console.log(equipment)
                    let gps = equipment.gps
                     if (!(dataMap.has(gps))) {
                          let values = []
                          values.push(equipment)
                          dataMap.set(gps, values)
                          console.log(values)
                      } else {
                          let values = dataMap.get(gps)
                          values.push(equipment)
                          dataMap.set(gps, values)
                      }
                    /*  var keys = dataMap.keys()
                while (keys.next().value != undefined) {
                        key = keys.next().value
                    if (key === gps) {
                        let values = dataMap.get(key)
                        values.push(equipment)
                        dataMap.set(key, values)

                    } else {
                        let values = []
                        values.push(equipment)
                        dataMap.set(key, values)
                        console.log(values)

                    }

                }*/
                })
                return dataMap
            })

            .catch(function (error) {
                console.log(error)
            })


    })
}
