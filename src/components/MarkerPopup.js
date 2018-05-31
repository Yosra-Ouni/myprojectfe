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
import {markerPopupAction} from "../actions/markerPopupAction"
import {toastr} from "react-redux-toastr";


@connect((store) => {
    return {
        alarms: store.mainReducer.alarms,
        //device : store.mainReducer.device
    }
})
class MarkerPopup extends React.Component {

    constructor(props) {
        super(props)
    }

    iconColor(device) {
        if (device.status != null) {
            console.log(device.status)
            if (device.status.toUpperCase() == "ACTIVATED") {
                return "green"
            }
            else if (device.status.toUpperCase() == "INACTIVE") {
                return "red"
            }
        }
        else {
            return "black";
        }
    }


    render() {
        const min = 1
        const max = 10
        const random = Math.floor(min + Math.random() * (max - min))
        const showModal = false
        const showActionModal = true
        const showNotif = true
        console.log("======>", this.props)
        const alarms = []
        const generalPopup = (msg) => {
            showNotificationAction(this.props.dispatch, showNotif, msg)
            toastr.error('Alarm',{
                timeOut: 10000,
                component: () => (
                    <NotificationPopup msg={msg}/>
                )
            })

        }
        return (
            <Popup maxHeight={'150'} flowing autoClose={false} closeOnClick={false}
                   onClose={() => markerPopupAction(this.props.dispatch, false)}>
                <div>
                    <div>
                        <SockJsClient url='http://localhost:8080/gs-guide-websocket' topics={['/user/queue/alarms','/topic/alarms']}
                                      headers={{deviceId: this.props.device.serialNumber}}
                                      onMessage={(msg) => {
                                          generalPopup(msg)
                                      }}
                                      ref={(client) => {
                                          this.clientRef = client
                                      }}/>

                    </div>
                    <Icon name={"selected radio"} color={this.iconColor(this.props.device)}
                          size={"large"}/>{this.props.device.type} {this.props.device.serialNumber}
                    <br/>
                    <Icon name={"marker"}/> ( {this.props.device.gps.lat} , {this.props.device.gps.lng} ) <br/>
                    <Icon name={"bell"}/> {random} {alarms.length} Alarms <br/>
                    <Icon name={"location arrow"}/> {this.props.device.address} <br/>
                    <Icon name={"map"}/> {this.props.device.region} <br/>
                    <div>
                        <Button content={' Show Details'} size={'tiny'} color='teal'
                                onClick={() => {
                                    showHideModalAction(this.props.dispatch, {showModal}, this.props.device)
                                }
                                }/>

                        <Button size={'tiny'} content={' Alarms'} secondary
                                onClick={() => {
                                    alarmsAction(this.props.dispatch, this.props.device.serialNumber, alarms)
                                    showHideAlarmsModalAction(this.props.dispatch, showActionModal, this.props.alarms)
                                }
                                }/>
                    </div>
                </div>
            </Popup>
        )
    }
}

export default MarkerPopup