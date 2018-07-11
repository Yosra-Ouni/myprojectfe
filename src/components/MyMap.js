import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import {Input, Button, Icon, Sidebar, Popup, Segment, Menu, Image, Header} from 'semantic-ui-react'
import Control from 'react-leaflet-control'
import {Map, TileLayer, Marker, MapControl,} from 'react-leaflet'
import MultipleMarkerPopup from "./MultipleMarkerPopup"
import EquipmentModal from './EquipmentModal'
import AlarmsModal from './AlarmsModal'
import MarkerLayer from './MarkerLayer'
import NotificationPopup from './NotificationPopup'
import SockJsClient from './SockJsClient'
import GlobalNotification from './GlobalNotification'
import L from 'leaflet'
import {initBoundsAction} from '../actions/initBoundsAction'
import {deleteBoundsStoreAction} from '../actions/deleteBoundsStoreAction'
import {globalNotificationAction} from '../actions/globalNotificationAction'
import D1 from '../../public/icons/device.png'
import D2 from '../../public/icons/devices.png'
import DC from '../../public/icons/dc.png'
import {showDcsOnly} from "../actions/showDcsOnly"
import {showHideAlarmsModalAction} from "../actions/showHideAlarmsModalAction"
import {showDevicesOnly} from "../actions/showDevicesOnly"
import SideBarAction from '../actions/SideBarAction'
import {alarmsAction} from "../actions/alarmsAction"
import {allAlarmsAction} from "../actions/allAlarmsAction"
import {toastr} from 'react-redux-toastr'

@connect((store) => {
    return {
        devices: store.mainReducer.devices,
        dcs: store.mainReducer.dcs,
        data1: store.mainReducer.data1,
        showModal: store.mainReducer.showModal,
        showActionModal: store.mainReducer.showActionModal,
        showGlobalNotif: store.mainReducer.showGlobalNotif,
        dataMap: store.mainReducer.dataMap,
        showNotif: store.mainReducer.showNotif,
        msg: store.mainReducer.msg,
        alarms: store.mainReducer.alarms,
        bounds: store.mainReducer.bounds,
        initBoundActionFulField: store.mainReducer.initBoundActionFulField,
        showPopup: store.mainReducer.showPopup
    }
})


class MyMap extends React.Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 14,
        hash: this.hash(),
        visible: false
    }


    constructor(props) {
        super(props)
        this.updateBounds = this.updateBounds.bind(this)
    }

    componentDidMount() {
        this.getInitBounds()

    }

    componentWillUnmount() {
        console.log("component unmounted")

    }

    toggleVisibility = () => this.setState({visible: !this.state.visible})

    deleteData() {
        let bounds = this.map.leafletElement.getBounds()
        let boundsRequest = {'bounds': bounds, 'hash': this.state.hash}
        deleteBoundsStoreAction(this.props.dispatch, boundsRequest)

    }

    hash() {
        var a = 1, c = 0, h, o;
        var s = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        if (s) {
            a = 0;
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
        this.map.leafletElement.zoomControl.setPosition('bottomright')

    }

    updateBounds() {
        console.log(this.state.hash)
        let alarms = []
        let bounds = this.map.leafletElement.getBounds()
        console.log('===width=>', this.map.leafletElement.getBounds().getEast() - this.map.leafletElement.getBounds().getWest())
        console.log('===hight=>', this.map.leafletElement.getBounds().getNorth() - this.map.leafletElement.getBounds().getSouth())
        console.log('===bounds=>', bounds)
        let boundsRequest = {'bounds': bounds, 'hash': this.state.hash}
        initBoundsAction(this.props.dispatch, boundsRequest, alarms)

    }

    render() {
        const {visible} = this.state
        const showActionModal = true
        const showNotif = true
        const showGlobalNotif = true
        const alarms = []

        let markericon = L.icon({
            iconUrl: D1,
            iconSize: [24, 24]
        })
        let markericon2 = L.icon({
            iconUrl: DC,
            iconSize: [24, 24]
        })
        let icon = (device) => {
            if (device.type === "device") return markericon
            else if (device.type === "dc") return markericon2
        }
        let position = [this.state.lat, this.state.lng]
        let min = 1
        let max = 10
        const random = Math.floor(min + Math.random() * (max - min))
        console.log(this.props.boundsRequest)
        const notif = (msg) => {
            globalNotificationAction(this.props.dispatch, showGlobalNotif, msg)
            toastr.light('Notifiaction', {component: GlobalNotification, timeOut: 10000 })
           //let marker = new L.Marker(msg.gps, {bounceOnAdd: true}).addTo(this.map.leafletElement);
        }
        let connectSockJsClientToAllTopic = () => {
            if (this.props.initBoundActionFulField === true) {
                return (<SockJsClient url='http://localhost:8080/gs-guide-websocket' topics={['/topic/all']}
                                      headers={{hash: this.state.hash}}
                                      onMessage={(msg) => {
                                          console.log(msg)
                                          notif(msg)
                                      }}
                                      ref={(client) => {
                                          this.clientRef = client
                                      }}/>)
            } else {
                return <div></div>
            }
        }
        return (
            <div>
                <Sidebar as={Menu} animation='push' width='thin' direction='left' visible={visible}
                         icon='labeled' vertical inverted>
                    <Menu.Item name='dot circle outline' onClick={() => {
                        showDevicesOnly(this.props.dispatch, this.props.bounds, alarms)
                    }}>
                        <Icon name='dot circle outline'/>
                        devices
                    </Menu.Item>
                    <Menu.Item name='database' onClick={() => {
                        showDcsOnly(this.props.dispatch, this.props.bounds, alarms)
                    }}>
                        <Icon name='database'/>
                        dcs
                    </Menu.Item>
                    <Menu.Item name='bell outline' onClick={() => {
                        allAlarmsAction(this.props.dispatch, alarms)
                        showHideAlarmsModalAction(this.props.dispatch, showActionModal)
                    }}>
                        <Icon name='bell outline'/>
                        alarms
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher as={Segment}>

                    <Button onClick={this.toggleVisibility}><Icon name='bars'/> Menu</Button>
                    {connectSockJsClientToAllTopic()}
                    <Map center={position} zoom={this.state.zoom} ref={(ref) => {
                        this.map = ref;
                    }} onLoad={this.getInitBounds} onMoveEnd={this.updateBounds}>

                        <TileLayer
                            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"/>

                        <MarkerLayer dataMap={this.props.dataMap} hash={this.state.hash}
                                     showPopup={this.props.showPopup}/>
                        <EquipmentModal modalOpen={this.props.showModal} random={random}msg={this.props.msg}/>
                        <AlarmsModal showActionModal={this.props.showActionModal} alarms={this.props.alarms}/>


                    </Map>
                </Sidebar.Pusher>
            </div>
        )
    }
}

export default MyMap