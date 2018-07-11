import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Grid, Header, Popup, Icon} from 'semantic-ui-react'
import {globalNotificationAction} from "../actions/globalNotificationAction"
import {showHideAlarmsModalAction} from "../actions/showHideAlarmsModalAction";

const timeoutLength = 2000

@connect((store) => {
    return {
        showGlobalNotif: store.mainReducer.showGlobalNotif,
        msg: store.mainReducer.msg,
    }
})
class GlobalNotification extends React.Component {

    constructor(props) {
        super(props)
    }

    handleOpen = () => {

        this.timeout = setTimeout(() => {
        }, timeoutLength)
    }

    handleClose = () => {
        globalNotificationAction(this.props.dispatch, false)
        clearTimeout(this.timeout)
    }

    render() {
        const showActionModal = true
        let content = this.props.msg
        console.log(content)
        let globalNotif = () => {
            if (content != undefined) {
                return (
                    <div>
                        {/*   <Popup
                        open={this.props.showGlobalNotif}
                        onClose={this.handleClose}
                        inverted
                        //onOpen={this.handleOpen}
                        position='top right'>
                    <Grid>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Notification</Header>*/}
                        <Icon name={"selected radio"}/> Equipment Id :{this.props.msg.serialNumber}
                        <br/>
                        <Icon name={"marker"}/> Equipment GPS
                        :<br/>( {this.props.msg.gps.lat} , {this.props.msg.gps.lng} ) <br/>
                        {/*  </Grid.Column>
                    </Grid>*/}
                    </div>
                )
            }
        }

        return (
            <div>
                {globalNotif()}
            </div>
        )
    }

}

export default GlobalNotification