import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Grid, Header, Popup} from 'semantic-ui-react'
import {globalNotificationAction} from "../actions/globalNotificationAction"

const timeoutLength = 2000

@connect((store) => {
    return {
        showGlobalNotif: store.mainReducer.showNotif,
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
        globalNotificationAction(this.props.dispatch,null, false)
        clearTimeout(this.timeout)
    }

    render() {
        /*let displayNotifs = () => {

            if (this.props.msg != undefined) {
                return (
                    <Popup
                        open={this.props.showGlobalNotif}
                        onClose={this.handleClose}
                        position='top right'>
                        <Button content={"show more details"}/>
                        <p>  {this.props.msg}</p>
                    </Popup>
                )

            } else {
                console.log("msg is undefined ")
            }
        }*/
        return (
            <div>
                <Popup
                    open={this.props.showGlobalNotif}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    position='top right'>
                    <Popup.Content>
                        <div>
                            {this.props.msg}
                            <Button content={"show more details"}/>
                        </div>
                    </Popup.Content>
                </Popup>
            </div>
        )
    }

}

export default GlobalNotification