import React, {Component} from 'react'
import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react'
import SideBarAction from '../actions/SideBarAction'
import {showHideAlarmsModalAction} from "../actions/showHideAlarmsModalAction"


class MySidebar extends Component {
    state = {visible: false}

    toggleVisibility = () => this.setState({visible: !this.state.visible})

    render() {
        const {visible} = this.state
        const showActionModal = true
        return (
            <div>
                <Button onClick={this.toggleVisibility}><Icon name='bars'/></Button>

                <Sidebar as={Menu} animation='overlay' width='thin' direction='right' visible={visible} icon='labeled'
                         vertical inverted>
                    <Menu.Item name='dot circle outline'>
                        <Icon name='dot circle outline'/>
                        devices
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
