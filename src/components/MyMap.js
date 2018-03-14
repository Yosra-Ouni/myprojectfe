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
import MySidebar from "./MySideBar"
import L from 'leaflet'
import {boundsAction} from '../actions/boundsAction'
import {initBoundsAction} from '../actions/initBoundsAction'
import EquipmentModal from './EquipmentModal'
@connect((store) => {
    return {
        devices: store.mainReducer.devices,
        dcs: store.mainReducer.dcs,
        data1: store.mainReducer.data1,
        showModal : store.mainReducer.showModal
    }
})


class MyMap extends React.Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 12
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


    render() {
        const position = [this.state.lat, this.state.lng]
        const markericon = L.icon({
            iconUrl: D1,
            iconSize: [24, 24]
        });
        const markericon1 = L.icon({
            iconUrl: D2,
            iconSize: [30, 30]
        });
        const markericon2 = L.icon({
            iconUrl: DC,
            iconSize: [24, 24]
        });
        const markericon3 = L.icon({
            iconUrl: DC,
            iconSize: [30, 30]
        });
        const sameGps = []
        const sameGpsKeys = []
        const seekEquipment = (gps, datas, sameGps, sameGpsKeys) => {
            datas.map((data, i) => {
                if (data.gps === gps) {
                    sameGps.push(data)
                    sameGpsKeys.push(i)
                }
            })
            console.log("sameGpsKeys", sameGpsKeys)
            return sameGpsKeys
        }


        const listOfData = () => {

            if (this.props.data1 != undefined) {
                let datas = this.props.data1.slice()
                return (
                    <ul>
                        {this.props.data1.map((device, i) => {
                                datas = datas.splice(0, 1)
                                console.log("this is datas", datas)
                                let sameGpsKeys = seekEquipment(device.gps, datas, [], [])
                                if (sameGpsKeys.length === 0) {
                                    if (device.type === "device") {
                                        console.log(device)
                                        return [(
                                            <li key={i}>
                                                <Marker position={device.gps} icon={markericon}>
                                                    <MarkerPopup device={device}/>
                                                </Marker>
                                            </li>)]
                                    } else if (device.type === "dc") {
                                        return [(
                                            <li key={i}>
                                                <Marker position={device.gps} icon={markericon2}>
                                                    <MarkerPopup device={device}/>
                                                </Marker>
                                            </li>)]
                                    }
                                } else {
                                    if (device.type === "device") {
                                        console.log(device)
                                        return [(
                                            <li key={i}>
                                                <Marker position={device.gps} icon={markericon1}>
                                                    <MultipleMarkerPopup sameGps={sameGps} device={device}/>
                                                </Marker>
                                            </li>)]
                                    }
                                    else if (device.type === "dc") {
                                        return [(
                                            <li key={i}>
                                                <Marker position={device.gps} icon={markericon3}>
                                                    <MultipleMarkerPopup  sameGps={sameGps} device={device}/>
                                                </Marker>
                                            </li>)]

                                    }
                                    sameGpsKeys.forEach(function (key) {
                                        datas = datas.splice(key, 1)
                                    })
                                    //console.log("this is datas", datas)
                                }
                            }
                        )}
                    </ul>
                )
            }

        }
        {/* {
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

        */}

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
*/}


        return (
            <Map center={position} zoom={this.state.zoom} ref={(ref) => {
                this.map = ref;
            }} onLoad={this.getInitBounds} onMoveEnd={this.updateBounds}>
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"/>
                {listOfData()}
                <EquipmentModal modalOpen ={this.props.showModal} />


                <Control position="topright">
                    <MySidebar></MySidebar>
                </Control>
            </Map>
        )
    }
}

export default MyMap