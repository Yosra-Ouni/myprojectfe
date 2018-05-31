import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Button, Grid, Header, Popup, Icon} from 'semantic-ui-react'
import {showNotificationAction} from "../actions/showNotificationAction";
import {connect} from "react-redux";
import store from '../store'
import {showHideAlarmsModalAction} from "../actions/showHideAlarmsModalAction";
import {allAlarmsAction} from "../actions/allAlarmsAction";

@connect((store) => {
    return {
        showNotif: store.mainReducer.showNotif,
        msg: store.mainReducer.msg
    }
})
class NotificationPopup extends React.Component {
    constructor(props) {
        super(props)
    }

    handleOpen = () => {
        this.timeout = setTimeout(() => {

        }, timeoutLength)
    }
    handleClose = () => showNotificationAction(this.props.dispatch, false)

    render() {

        const showActionModal = true
        return (
            <div>
                {/*    <Popup
                    open={this.props.showNotif}
                    onClose={this.handleClose}
                    //onOpen={this.handleOpen}
                    position='top right'
                    //inverted
                >*/}
                <Grid centered>
                    <Grid.Column textAlign='center'>


                        <Icon name={"selected radio"}/> Equipment Id :{this.props.msg.serialNumber}
                        <br/>
                        <Icon name={"marker"}/> Equipment GPS
                        :<br/>( {this.props.msg.gps.lat} , {this.props.msg.gps.lng} ) <br/>
                        <Button animated color={'grey'} compact onClick={() => {
                            showHideAlarmsModalAction(this.props.dispatch, showActionModal)
                            allAlarmsAction(this.props.dispatch, [])
                        }}>
                            <Button.Content visible>show more</Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow'/>
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                </Grid>
                {/*  </Popup>*/}
            </div>
        )
    }
}

export default NotificationPopup