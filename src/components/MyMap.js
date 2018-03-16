import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Input, Button, Icon, Sidebar} from 'semantic-ui-react'
import Control from 'react-leaflet-control'
import {Map, TileLayer, Marker, Popup, MapControl,} from 'react-leaflet'
import D1 from '../../public/icons/device.png'
import D2 from '../../public/icons/devices.png'
import DC from '../../public/icons/dc.png'
import MarkerPopup from "./MarkerPopup"
import MultipleMarkerPopup from "./MultipleMarkerPopup"
import EquipmentModal from './EquipmentModal'
import MySidebar from "./MySideBar"
import L from 'leaflet'
import {boundsAction} from '../actions/boundsAction'
import {initBoundsAction} from '../actions/initBoundsAction'

//import {displayEquipmentsAction} from '../actions/displayEquipmentsAction'


@connect((store) => {
    return {
        devices: store.mainReducer.devices,
        dcs: store.mainReducer.dcs,
        data1: store.mainReducer.data1,
        showModal: store.mainReducer.showModal,
        //sameGps: store.mainReducer.sameGps
    }
})


class MyMap extends React.Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 12,

    }

    constructor(props) {
        super(props)
        this.updateBounds = this.updateBounds.bind(this)


    }

    getInitBounds() {
        const data1 = []
        const bounds = this.map.leafletElement.getBounds()
        initBoundsAction(this.props.dispatch, bounds, data1)
        console.log(bounds)
    }

    updateBounds() {
        const data1 = []
        const bounds = this.map.leafletElement.getBounds()
        boundsAction(this.props.dispatch, bounds, data1)
        console.log(bounds)
    }


    componentDidMount() {
        this.getInitBounds()
    }

    componentDidUpdate() {

    }

    /* seekEquipment(device, datas) {
        const sameGps = []
        const sameGpsKeys = []
        if (datas.lentgh !== 0) {

            datas.forEach((item, index) => {
                if (item.gps === device.gps) {
                    sameGps.push(item)
                    sameGpsKeys.push(index)
                }
            })
            //this.setState({sameGpsKeys: sameGpsKeys})
            console.log("sameGpsKeys", sameGpsKeys)
            console.log("sameGps", sameGps)

        }
       if (sameGps.lentgh === 0) {
            differentGps.push(device)
            console.log(differentGps)
        }
        displayEquipmentsAction(this.props.dispatch, sameGps)
        return sameGpsKeys
    }*/


    render() {

        const position = [this.state.lat, this.state.lng]
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
            if (this.props.data1 != undefined) {
                for (let i = 0; i < 10; i++) {
                    datas = dataMap.get(i)
                if (datas.length !== 1) {
                        
                    return [(
                        <li key={i}>
                            <Marker position={device.gps} icon={icons(device)}>
                                <MultipleMarkerPopup datas={datas}/>
                            </Marker>
                        </li>)]
                } else {
                    return [(
                        <li key={i}>
                            <Marker position={device.gps} icon={icon(device)}>
                                <MarkerPopup device={device}/>
                            </Marker>
                        </li>)]
                }


            }

}
}


{/* {
               console.log(this.props.differentGps)
                            if (this.props.differentGps.length !== 0) {
                                return (
                                    <ul>
                                        {this.props.differentGps.map((device, i) => {

                                            }
                                        )
                                        }
                                    </ul>
                                )
                            }





                                this.props.devices.map((device, i) => {
                                    console.log(device)
                                    if (device.on)
                                        return [(
                                            <li key={i}>
                                                <Marker position={device.gps} icon={marker1Icon}>
                                                    <MarkerPopup device={device}/>
                                                </Marker>

                                            </li>)]
                                })
                            }
                                    </ul>)
                            }

             */
}

{/*const filterByBoundsFactory = (bounds) =>
            (equipement) => {
                const {lng, lat} = equipement;

                return (
                    lng > bounds.southWest.lng &&
                    lng < bounds.northEast.lng &&
                    lat > bounds.southWest.lat &&
                    lat < bounds.northEast.lat
                );
            }
            */
}


return (
    <Map center={position} zoom={this.state.zoom} ref={(ref) => {
        this.map = ref;
    }} onLoad={this.getInitBounds} onMoveEnd={this.updateBounds}>
        <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"/>
        {sortingData()}
        {listOfData()}
        <EquipmentModal modalOpen={this.props.showModal}/>


        <Control position="topright">
            <MySidebar></MySidebar>
        </Control>
    </Map>
)
}
}

export default MyMap