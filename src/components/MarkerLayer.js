import React from "react"
import {connect} from 'react-redux'
import store from '../store'
import PopupLayer from "./PopupLayer"
import Control from 'react-leaflet-control'
import {Marker} from 'react-leaflet'
import L from "leaflet";
import D1 from '../../public/icons/device.png'
import D2 from '../../public/icons/devices.png'
import DC from '../../public/icons/dc.png'

@connect((store) => {
    return {
        device: store.mainReducer.device,
        showPopup : store.mainReducer.showPopup
    }
})
class MarkerLayer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        //let showPopup = false
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
            if (device.type != null) {
                if (device.type === "device") return markericon
                else if (device.type === "dc") return markericon2
            }
            else {
                return markericon
            }
        }
        const icons = (device) => {
            if (device.type != null) {
                if (device.type === "device") return markericon1
                else if (device.type === "dc") return markericon3
            }
            else {
                return markericon1
            }
        }
        const listOfData = () => {
            console.log(this.props.dataMap)
            if (this.props.dataMap != undefined) {
                console.log(this.props.dataMap)
                let v = [];
                this.props.dataMap.forEach((items, index, mapObj) => {
                    console.log(items[0].gps)
                    if (items.length === 1) {
                        const device = items[0]
                        v.push(
                            <li key={index}>
                                <Marker position={device.gps} icon={icon(device)}>
                                    <PopupLayer device={device} hash={this.props.hash} showPopup={this.props.showPopup}/> {/**/}
                                </Marker>
                            </li>
                        )
                    } else {
                        const device = items[0]
                        console.log("hey I'm heeere in MultipleMarkerPopup")
                        v.push(
                            <li key={index}>
                                <Marker position={device.gps} icon={icons(device)}>
                                    <PopupLayer items={items} hash={this.props.hash} showPopup={this.props.showPopup}/>
                                </Marker>
                            </li>
                        )
                    }


                })
                {/* the marken at the corner

                v.push(
                    <li key={'lol'}>
                        <Marker position={[51.625263734761276,-0.28358459462656256]} icon={markericon1}/>
                    </li>

           */
                }
                return v
            }
        }
        return (
            <div>
                {listOfData()}
            </div>
        )
    }
}

export default MarkerLayer