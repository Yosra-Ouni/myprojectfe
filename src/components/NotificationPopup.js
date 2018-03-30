import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Button, Grid, Header, Popup} from 'semantic-ui-react'
import {showNotificationAction} from "../actions/showNotificationAction";
import {connect} from "react-redux";
import store from '../store'

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
    handleClose = () => this.props.dispatch(showNotificationAction(this.props.dispatch, false))

    render() {
//const timeoutLength = 2500

        return (
            <Popup
                   content={this.props.msg}

                   open={this.props.showNotif}
                   onClose={this.handleClose}
                //onOpen={this.handleOpen}
                   position='bottom right'
                   inverted
            />

        )
    }
}

export default NotificationPopup