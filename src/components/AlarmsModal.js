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
        const listOfAlarms =() =>{
            if (this.props.alarms != undefined) {
                console.log(this.props.alarms)
                this.props.alarms.map((alarm, i) => {
                    return (
                        <li key={index}>
                            <h3>
                                {alarm}
                            </h3>
                        </li>)
                } )}
    }
        return (
            <Modal
                open={modalOpen}
                onClose={this.handleClose}
                size='large'
                //dimmer={"inverted"}
                basic
                closeIcon
            >
                <Grid>
                    <Grid.Row>
                        {listOfAlarms()}
                    {/* */}
                    </Grid.Row>
                </Grid>
            </Modal>
        )
    }
}

export default AlarmsModal