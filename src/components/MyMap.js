import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Input, Button, Icon, Sidebar} from 'semantic-ui-react'
import Control from 'react-leaflet-control'
import {Map, TileLayer, Marker, Popup, MapControl,} from 'react-leaflet'
import MarkerPopup from "./MarkerPopup"
import MultipleMarkerPopup from "./MultipleMarkerPopup"
import EquipmentModal from './EquipmentModal'
import MySidebar from "./MySideBar"
import MarkerLayer from './MarkerLayer'
import L from 'leaflet'
import {boundsAction} from '../actions/boundsAction'
import {initBoundsAction} from '../actions/initBoundsAction'
import D1 from '../../public/icons/device.png'
import D2 from '../../public/icons/devices.png'
import DC from '../../public/icons/dc.png'

//import {displayEquipmentsAction} from '../actions/displayEquipmentsAction'


@connect((store) => {
    return {
        devices: store.mainReducer.devices,
        dcs: store.mainReducer.dcs,
        data1: store.mainReducer.data1,
        showModal: store.mainReducer.showModal,
        dataMap: store.mainReducer.dataMap
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
        boundsAction(this.props.dispatch, bounds)
        console.log(bounds)
    }


    componentDidMount() {
        this.getInitBounds()
    }

    componentDidUpdate() {

    }

    render() {
        const markericon = L.icon({
            iconUrl: D1,
            iconSize: [24, 24]
        })
        const markericon2 = L.icon({
            iconUrl: DC,
            iconSize: [24, 24]
        })
        const icon = (device) => {
            if (device.type === "device") return markericon
            else if (device.type === "dc") return markericon2
        }
        const position = [this.state.lat, this.state.lng]
        const min = 1
        const max = 10
        const random = Math.floor(min + Math.random() * (max - min))
        const listOfData = () => {
            if (this.props.data1 != undefined) {
                return (
                    <ul>
                        {this.props.data1.map((device, i) => {
                            return [(
                                <li key={i}>
                                    <Marker position={device.gps} icon={icon(device)}>
                                        <MarkerPopup device={device}/>
                                    </Marker>
                                </li>)]

                        })
                        }
                    </ul>
                )
            }
        }

        //const MyCmp = (x,y) => null

        return (
            <Map center={position} zoom={this.state.zoom} ref={(ref) => {
                this.map = ref;
            }} onLoad={this.getInitBounds} onMoveEnd={this.updateBounds}>
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"/>

                {/*  <MyCmp x ={}/>
                <MarkerLayer dataMap={this.props.dataMap}/>*/}
                <EquipmentModal modalOpen={this.props.showModal} random={random}/>

                {listOfData()}
                <Control position="topright">
                    <MySidebar></MySidebar>
                </Control>
            </Map>
        )
    }
}

export default MyMap