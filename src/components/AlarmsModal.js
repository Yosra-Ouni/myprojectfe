import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, Header, Modal, popup, Grid,Transition } from 'semantic-ui-react'
import MarkerPopup from './MarkerPopup'
import {showHideAlarmsModalAction} from '../actions/showHideAlarmsModalAction'
//import '/node_modules/react-grid-layout/css/styles.css'
//import '/node_modules/react-resizable/css/styles.css'
//import


@connect((store) => {
    return {
        showModal: store.mainReducer.showModal,
        device: store.mainReducer.device,
        alarms : store.mainReducer.alarms
    }
})
class AlarmsModal extends React.Component {
    state = {
        showActionModal: false,
    }

    constructor(props) {
        super(props)
        console.log(this.props.alarms)
    }

    handleClose = () => this.props.dispatch(showHideAlarmsModalAction(this.props.dispatch, this.state.showActionModal))

    render() {
        const modalOpen = this.props.showActionModal && true
        const listOfAlarms = () => {
            if (this.props.alarms != undefined) {
                let v = []
                console.log(this.props.alarms)
                {
                    this.props.alarms.map((alarm, index) => {

                        {
                                console.log(alarm.type)
                                v.push(
                                    <div key={index}>
                                        < Icon name={"bell"}/> Type : {alarm.type} <br/>
                                        < Icon name={"barcode"}/> Code : {alarm.code} <br/>
                                        < Icon name={"selected radio"}/> Origin:{alarm.origin} {/*{alarm.equipment.serialNumber}*/}<br/>
                                        < Icon name={"calendar"}/>  Date:{alarm.creationDate}<br/>
                                        < Icon name={"warning circle"}/> Content : {alarm.content} <br/>

                                    </div>)
                        }

                    })
                }
                return v
            }
        }
        return (
            <Transition visible={modalOpen} animation='fade' duration={700}>
                <Modal
                    open={modalOpen}
                    onClose={this.handleClose}
                    size='small'
                    //dimmer={"inverted"}
                    closeIcon
                >
                    <Modal.Content>
                        <Grid celled='internally'>
                            <Grid.Row>
                                <h3>
                                    {listOfAlarms()}

                                </h3>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button //color='blue'
                            color='teal'
                            onClick={this.handleClose}
                        >
                            <Icon name='checkmark'/> Done
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Transition>
        )
    }
}

export default AlarmsModal