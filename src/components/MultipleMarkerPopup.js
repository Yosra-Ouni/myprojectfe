import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, popup} from 'semantic-ui-react'
import Control from 'react-leaflet-control'
import {Marker, Popup} from 'react-leaflet'
import {markerPopupAction} from "../actions/markerPopupAction"
import {showHideModalAction} from "../actions/showHideModalAction"
import SockJsClient from './SockJsClient'
import {showNotificationAction} from "../actions/showNotificationAction"
import MarkerPopup from "./MarkerPopup"

@connect((store) => {
    return {
        showModal: store.mainReducer.showModal,
    }
})

class MultipleMarkerPopup extends React.Component {
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
        let showModal = false
        let showNotif = true
        let showPopup = true
        const icon = (device) => {
            if (device.type === "device") return <Icon color={this.iconColor(device)} size={"large"} name={"selected radio"}/>
            else if (device.type === "dc") return <Icon name={"database"}/>
        }
        let generalPopup = (msg) => {
           showNotificationAction(this.props.dispatch, showNotif, msg)
        }
        const listOfItems = () => {
            console.log()
            if (this.props.items != undefined) {
                return (
                    <div>
                        {this.props.items.map((device, i) => {
                            console.log(device)
                            return (
                                <div key={i}>
                                    {icon(device)} {device.type} {device.serialNumber}

                                    < Icon name={'plus'} color='teal' size={'large'}
                                           onClick={() => markerPopupAction(this.props.dispatch, showPopup, device,this.props.items)}/>

                                </div>

                            )
                        })

                        }
                    </div>
                )

            }
        }

        return (
            <Popup size={'big'}>
                <div>
                    <div>
                        {/* <SockJsClient url='http://localhost:8080/gs-guide-websocket' topics={['/topic/greetings']}
                                      onMessage={(msg) => {
                                          console.log(msg)
                                          generalPopup(msg)
                                      }}
                                      ref={(client) => {
                                          this.clientRef = client
                                      }}/>*/}

                    </div>
                    {listOfItems()}
                </div>
            </Popup>
        )
    }
}

export default MultipleMarkerPopup