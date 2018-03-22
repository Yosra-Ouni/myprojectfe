import React from "react";
import store from '../store'
import Control from 'react-leaflet-control'
import {Marker} from 'react-leaflet'
import MarkerPopup from "./MarkerPopup"
import MultipleMarkerPopup from "./MultipleMarkerPopup"
import L from "leaflet";
import D1 from '../../public/icons/device.png'
import D2 from '../../public/icons/devices.png'
import DC from '../../public/icons/dc.png'

class MarkerLayer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const markericon = L.icon({
            iconUrl: D1,
            iconSize: [24, 24]
        })
        const markericon1 = L.icon({
            iconUrl: D2,
            iconSize: [30, 30]
        })
        const markericon2 = L.icon({
            iconUrl: DC,
            iconSize: [24, 24]
        })
        const markericon3 = L.icon({
            iconUrl: DC,
            iconSize: [30, 30]
        })
        const icon = (device) => {
            if (device.type === "device") return markericon
            else if (device.type === "dc") return markericon2
        }
        const icons = (device) => {
            if (device.type === "device") return markericon1
            else if (device.type === "dc") return markericon3
        }
        const listOfData = () => {
            console.log(this.props.dataMap)
            if (this.props.dataMap != undefined) {
                return (
                        this.props.dataMap.forEach((items, index, mapObj) => {
                            console.log(items)
                            if (items.length === 1) {
                                let device = items[0]
                                //console.log( device,i )
                                return [(

                                    <Marker position={device.gps} icon={icon(device)}>
                                        {/* <MarkerPopup device={device}/>  */}
                                    </Marker>
                                )]
                            } else {
                                let device = items[0]
                                console.log("hey I'm heeere in MultipleMarkerPopup")
                                return [(

                                    <Marker position={device.gps} icon={icons(device)}>
                                        {/* <MultipleMarkerPopup items={items}/>*/}
                                    </Marker>

                                )]
                            }


                        })
                )
            }
        }

        //const displayData =


        return (

            <div>
                {listOfData()}
            </div>
        )
    }
}

export default MarkerLayer