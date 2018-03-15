import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, Header, Modal, popup, Grid, Image} from 'semantic-ui-react'
import MarkerPopup from './MarkerPopup'
import {showHideModalAction} from '../actions/showHideModalAction'
import {PieChart} from 'react-charts-plus'
//import '/node_modules/react-grid-layout/css/styles.css'
//import '/node_modules/react-resizable/css/styles.css'
//import


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

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    handleClose = () => this.props.dispatch(showHideModalAction(this.props.dispatch, this.state.showModal))

    render() {
        const icon = () => {
            if (this.props.device.type === "device") return <Icon name={"selected radio"}/>
            else if (this.props.device.type === "dc") return <Icon name={"database"}/>
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
        /* */var data = {
             label: 'somethingA',
             values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
         };

        return (
            <Modal
                open={this.props.modalOpen}
                onClose={this.handleClose}
                size='large'
                closeIcon
                //dimmer={"inverted"}
            >
                <Header icon='plus' content='Equipment details'/>
                <Modal.Content>
                    <div>
                        <Grid>
                            <Grid.Row>
                                <h3>
                                    {showDeviceDetails()}
                                </h3>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={8}>
                                    {/*
                                    <PieChart
                                        data={data}
                                        width={400}
                                        height={200}
                                        margin={{top: 10, bottom: 10, left: 100, right: 100}}
                                        sort={null}
                                    />*/}
                                </Grid.Column>
                                <Grid.Column width={8}>

                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={8}>

                                </Grid.Column>
                                <Grid.Column width={8}>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </div>
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
