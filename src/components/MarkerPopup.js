import React from "react";
import {Popup} from 'react-leaflet'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, Container, Modal, Header} from 'semantic-ui-react'
import {initialData} from '../data.js'
import SockJsClient from './SockJsClient'
import {connect} from "react-redux"
import store from '../store'
import {hideDeviceAction} from '../actions/showHideAlarmsModalAction'
import {showHideModalAction} from '../actions/showHideModalAction'
import {showNotificationAction} from '../actions/showNotificationAction'
import {showHideAlarmsModalAction} from '../actions/showHideAlarmsModalAction'
import {alarmsAction} from '../actions/alarmsAction'
import EquipmentModal from './EquipmentModal'
import NotificationPopup from './NotificationPopup'


@connect((store) => {
    return {
        alarms: store.mainReducer.alarms
    }
})
class MarkerPopup extends React.Component {

    constructor(props) {
        super(props)
    }
    //handleClose = () => this.setState({showPopup: false})
    render() {
        const min = 1
        const max = 10
        const random = Math.floor(min + Math.random() * (max - min))
        const showModal = false
        const showActionModal = true
        const showNotif = true

        const alarms = []
        const generalPopup = (msg) => {
            this.props.dispatch(showNotificationAction(this.props.dispatch, showNotif, msg))
            // this.props.alarms.push(msg)
            //this.props.dispatch(alarmsAction(this.props.dispatch, this.props.device.id, alarms))
        }
        return (
            <Popup maxHeight={'150'}>
                <div>
                    <div>
                        <SockJsClient url='http://localhost:8080/gs-guide-websocket' topics={['/topic/greetings']}
                                     x
                                      onMessage={(msg) => {
                                          console.log(msg)
                                          generalPopup(msg)
                                      }}
                                      ref={(client) => {
                                          this.clientRef = client
                                      }}/>

                    </div>
                    <Icon name={"selected radio"}/>{this.props.device.type} {this.props.device.serialNumber}
                    {this.props.device.status} <br/>
                    <Icon name={"marker"}/> ( {this.props.device.gps.lat} , {this.props.device.gps.lng} ) <br/>
                    <Icon name={"bell"}/> {random} {alarms.length} Alarms <br/>
                    <Icon name={"location arrow"}/> {this.props.device.address} <br/>
                    <Icon name={"map"}/> {this.props.device.region} <br/>
                    <div>
                        <Button content={' Show Popup'} size={'tiny'} color='teal'
                                onClick={() => this.props.dispatch(showHideModalAction(this.props.dispatch, {showModal}, this.props.device))}/>

                        <Button size={'tiny'} content={' Alarms'} secondary
                                onClick={() => {
                                    //this.props.dispatch(alarmsAction(this.props.dispatch, this.props.device.id, alarms))
                                    this.props.dispatch(showHideAlarmsModalAction(this.props.dispatch, showActionModal))
                                }}/>
                    </div>
                </div>
            </Popup>
        )
    }
}

export default MarkerPopup