import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, Header, Modal, popup, Grid} from 'semantic-ui-react'
import MarkerPopup from './MarkerPopup'
import {showHideAlarmsModalAction} from '../actions/showHideAlarmsModalAction'
//import '/node_modules/react-grid-layout/css/styles.css'
//import '/node_modules/react-resizable/css/styles.css'
//import


@connect((store) => {
    return {
        showModal: store.mainReducer.showModal,
        device: store.mainReducer.device
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
                            alarm.alarms.map((item, i) => {

                                console.log(item.type)
                                v.push(
                                    <div key ={i}>
                                        < Icon name={"selected radio"}/> device Id : {alarm.serialNumber} <br/>
                                        < Icon name={"bell"}/> Type : {item.type} <br/>
                                        < Icon name={"alarm"}/> content : {item.content} <br/>

                                    </div>)
                            })

                        }

                    })
                }
                return v
            }
        }
        return (
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
        )
    }
}

export default AlarmsModal