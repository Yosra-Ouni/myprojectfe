import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, Header, Modal, popup} from 'semantic-ui-react'
import MarkerPopup from './MarkerPopup'
import {showHideModalAction} from "../actions/showHideModalAction"


@connect((store) => {
    return {
        showModal: store.mainReducer.showModal,
        device: store.mainReducer.device
    }
})
class EquipmentModal extends React.Component {
    state = {
        showModal: this.props.showModal,

    }
    handleClose = () => this.props.dispatch(showHideModalAction(this.props.dispatch, this.state.showModal))

    render() {
        const icon=()=>{
            if (this.props.device.type==="device") return <Icon name={"selected radio"}/>
            else if  (this.props.device.type==="dc") return  <Icon name={"database"}/>
        }
        const showDeviceDetails = () => {
            if (this.props.device != undefined) {
                return (
                    <div>
                        {icon()} {this.props.device.type}
                        {this.props.device.id}<br/>
                        < Icon name={"location arrow"}/> {this.props.device.address} <br/>
                        < Icon name={"map"}/> {this.props.device.region} <br/>
                        < Icon name={"marker"}/> ( {this.props.device.gps.lat} , {this.props.device.gps.lng} ) <br/>
                    </div>
                )
            }
        }
        return (
            <Modal
                open={this.props.modalOpen}
                onClose={this.handleClose}
                size='small'
                closeIcon
                //dimmer={"inverted"}
            >
                <Header icon='plus' content='Equipment details'/>
                <Modal.Content>
                    <h3>
                        {showDeviceDetails()}
                    </h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button //color='blue'
                        primary
                        onClick={this.handleClose}
                        inverted>
                        <Icon name='checkmark'/> Done
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default EquipmentModal
