import React from "react";
import {Popup} from 'react-leaflet'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, Container, Modal, Header} from 'semantic-ui-react'
import {initialData} from '../data.js';
import SockJsClient from './SockJsClient';
import {connect} from "react-redux";
import {hideDeviceAction} from '../actions/hideDeviceAction'
import {showHideModalAction} from '../actions/showHideModalAction'
import EquipmentModal from './EquipmentModal'


@connect((store) => {
    return {
        devices: store.mainReducer.devices,
        dcs: store.mainReducer.dcs,
        rx: store.mainReducer.rx,
        data1: store.mainReducer.data1,


    }
})
class MarkerPopup extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const min = 1
        const max = 10
        const random = Math.floor(min + Math.random() * (max - min))
        const showModal = false

        return (
            <Popup maxHeight={'150'}>
                <div>
                    <div>
                        <SockJsClient url='http://localhost:8080/gs-guide-websocket' topics={['/topic/greetings']}
                                      onMessage={(msg) => {
                                          console.log(msg);
                                      }}
                                      ref={(client) => {
                                          this.clientRef = client
                                      }}/>
                    </div>
                    {/* <h1>{this.props.rx}</h1> onClick={() => this.props.dispatch(hideDeviceAction('dd'))} */}
                    <Icon name={"selected radio"}/>{this.props.device.type} {random} Alarms
                    <span>{this.props.device.id} <br/>
                    <Icon name={"location arrow"}/> {this.props.device.address} <br/>
                    <Icon name={"map"}/> {this.props.device.region} <br/>
                    <Icon name={"marker"}/> ( {this.props.device.gps.lat} , {this.props.device.gps.lng} ) <br/>
                    </span>
                    <div>
                        <Button size={'tiny'} primary
                                onClick={() => this.props.dispatch(showHideModalAction(this.props.dispatch, {showModal}, this.props.device))}>
                            Show Popup
                        </Button>
                        <Button size={'tiny'} secondary>Alarms</Button>
                    </div>
                </div>
            </Popup>
        )
    }
}

export default MarkerPopup