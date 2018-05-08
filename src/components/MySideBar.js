import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../store'
import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react'
import SideBarAction from '../actions/SideBarAction'
import {showHideAlarmsModalAction} from "../actions/showHideAlarmsModalAction"
import {showDcsOnly} from '../actions/showDcsOnly'
import {showDevicesOnly} from '../actions/showDevicesOnly'



class MySidebar extends Component {
    state = {visible: false}
    constructor(props) {
        super(props)
    }

    toggleVisibility = () => this.setState({visible: !this.state.visible})

    render() {
        const {visible} = this.state
        const showActionModal = true
        const alarms = []
        console.log(this.props.bounds)

        return (
            <div>
                <Button onClick={this.toggleVisibility}><Icon name='bars'/></Button>

                <Sidebar as={Menu} animation='overlay' width='thin' direction='right' visible={visible} icon='labeled'
                         vertical inverted>
                    <Menu.Item name='dot circle outline' onClick={() => {
                        showDevicesOnly(this.props.dispatch, this.props.bounds, alarms)
                    }}>
                        <Icon name='dot circle outline'/>
                        devices
                    </Menu.Item>
                    <Menu.Item name='database' onClick={() => {
                        showDcsOnly(this.props.dispatch, this.props.bounds, alarms)
                    }}>
                        <Icon name='database'/>
                        dcs
                    </Menu.Item>
                    <Menu.Item name='bell outline' onClick={() => {
                        this.props.dispatch(showHideAlarmsModalAction(this.props.dispatch, showActionModal))
                    }}>
                        <Icon name='bell outline'/>
                        alarms
                    </Menu.Item>
                    <Menu.Item name='content'>
                        <Icon name='content'/>
                        Channels
                    </Menu.Item>
                </Sidebar>

            </div>
        )
    }
}

export default MySidebar
