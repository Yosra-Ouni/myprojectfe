import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, popup} from 'semantic-ui-react'
import Control from 'react-leaflet-control'
import {Marker, Popup} from 'react-leaflet'
import {showHideModalAction} from "../actions/showHideModalAction"
import SockJsClient from './SockJsClient'
import {showNotificationAction} from "../actions/showNotificationAction";
@connect((store) => {
    return {
        showModal: store.mainReducer.showModal,
    }
})

class MultipleMarkerPopup extends React.Component {

    render() {
        const showModal = false
        const showNotif = true
        const icon = (device) => {
            if (device.type === "device") return <Icon size={"large"} name={"selected radio"}/>
            else if (device.type === "dc") return <Icon name={"database"}/>
        }
        const generalPopup = (msg) => {
            this.props.dispatch(showNotificationAction(this.props.dispatch, showNotif, msg))
            // this.props.alarms.push(msg)
            //this.props.dispatch(alarmsAction(this.props.dispatch, this.props.device.id, alarms))
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
                                            onClick={() => this.props.dispatch(showHideModalAction(this.props.dispatch, {showModal}, device))}/>
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
                        <SockJsClient url='http://localhost:8080/gs-guide-websocket' topics={['/topic/greetings']}
                                      onMessage={(msg) => {
                                          console.log(msg)
                                          generalPopup(msg)
                                      }}
                                      ref={(client) => {
                                          this.clientRef = client
                                      }}/>

                    </div>
                    {listOfItems()}
                </div>
            </Popup>
        )
    }
}

export default MultipleMarkerPopup