import React from "react"
import {Popup} from 'react-leaflet'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, Container, Grid} from 'semantic-ui-react'
import {initialData} from '../data.js'
import SockJsClient from './SockJsClient'
import {connect} from "react-redux"
import {showHideModalAction} from '../actions/showHideModalAction'

@connect((store) => {
    return {
        devices: store.mainReducer.devices,
        dcs: store.mainReducer.dcs,
        rx: store.mainReducer.rx,
        data1: store.mainReducer.data1
    }
})
class MultipleMarkerPopup extends React.Component {
    render() {
        const listOfSameGps = () => {
            { console.log(this.props.sameGps)
                this.props.sameGps.map((device, i) => {

                    if (this.props.device.type === "device") {
                        <Icon name={"selected radio"}/>
                    } else if (this.props.device.type === "dc") {
                        <Icon name={"database"}/>
                    }
                    {this.props.device.type}
                    {this.props.device.id}
                    <Button content='Show Popup' primary/>

                })
            }
        }
        return (
            <Popup>
                <div>

                    {/*<GridList cols={4} >*/}
                    {listOfSameGps()}
                    {/*</GridList>*/}

                </div>
            </Popup>
        )
    }
}

export default MultipleMarkerPopup