import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Input, Button, Icon, Sidebar, Popup} from 'semantic-ui-react'
import Control from 'react-leaflet-control'
import {Map, TileLayer, Marker, MapControl,} from 'react-leaflet'
import MarkerPopup from "./MarkerPopup"
import MultipleMarkerPopup from "./MultipleMarkerPopup"
import EquipmentModal from './EquipmentModal'
import AlarmsModal from './AlarmsModal'
import MySidebar from "./MySideBar"
import MarkerLayer from './MarkerLayer'
import NotificationPopup from './NotificationPopup'
import L from 'leaflet'
import {boundsAction} from '../actions/boundsAction'
import {initBoundsAction} from '../actions/initBoundsAction'
import {deleteBoundsStoreAction} from '../actions/deleteBoundsStoreAction'
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
        showActionModal: store.mainReducer.showActionModal,
        dataMap: store.mainReducer.dataMap,
        showNotif: store.mainReducer.showNotif,
        msg: store.mainReducer.msg,
        alarms: store.mainReducer.alarms
    }
})


class MyMap extends React.Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 12,
        hash: this.hash()

    }

    constructor(props) {
        super(props)
        this.updateBounds = this.updateBounds.bind(this)
        this.onUnload = this.onUnload.bind(this);

    }

    onUnload(event) { // the method that will be used for both add and remove event
        console.log("paaaawwww")
        return "paaaawwww"
       event.returnValue = "paaaawwww"
    }

    deleteData() {
        let bounds = this.map.leafletElement.getBounds()
        let boundsRequest = {'bounds': bounds, 'hash': this.state.hash}
        deleteBoundsStoreAction(this.props.dispatch, boundsRequest)

    }

    hash() {
        /* Simple hash function. */
        var a = 1, c = 0, h, o;
        var s = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        if (s) {
            a = 0;
            /*jshint plusplus:false bitwise:false*/
            for (h = s.length - 1; h >= 0; h--) {
                o = s.charCodeAt(h);
                a = (a << 6 & 268435455) + o + (o << 14);
                c = a & 266338304;
                a = c !== 0 ? a ^ c >> 21 : a;
            }
        }
        return String(a);
    }


    getInitBounds() {
        let alarms = []
        console.log(this.state.hash)
        let bounds = this.map.leafletElement.getBounds()
        let boundsRequest = {'bounds': bounds, 'hash': this.state.hash}
        initBoundsAction(this.props.dispatch, boundsRequest, alarms)
        console.log(bounds)
    }

    updateBounds() {
        console.log(this.state.hash)
        let alarms = []
        let bounds = this.map.leafletElement.getBounds()
        console.log('===width=>', this.map.leafletElement.getBounds().getEast() - this.map.leafletElement.getBounds().getWest())
        console.log('===hight=>', this.map.leafletElement.getBounds().getNorth() - this.map.leafletElement.getBounds().getSouth())
        console.log('===bounds=>', bounds)
        let boundsRequest = {'bounds': bounds, 'hash': this.state.hash}
        boundsAction(this.props.dispatch, boundsRequest, alarms)

    }


    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload)
        this.getInitBounds()

    }

    componentWillUnmount() {

        console.log("component unmounted")
        // window.removeEventListener("beforeunload", this.onUnload)
    }

    render() {
        const showNotif = true
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


        //const MyCmp = (x,y) => null

        return (
            <Map center={position} zoom={this.state.zoom} ref={(ref) => {
                this.map = ref;
            }} onLoad={this.getInitBounds} onMoveEnd={this.updateBounds}>
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"/>

                {/*  <MyCmp x ={}/>*/}
                <MarkerLayer dataMap={this.props.dataMap}/>
                <EquipmentModal modalOpen={this.props.showModal} random={random}/>
                <AlarmsModal showActionModal={this.props.showActionModal} alarms={this.props.alarms}/>
                <NotificationPopup showNotif={this.props.showNotif} msg={this.props.msg}/>

                <Control position="topright">
                    <MySidebar alarms={this.props.alarms} dispatch={this.props.dispatch}></MySidebar>
                </Control>
            </Map>
        )
    }
}

export default MyMap