import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, Header, Modal, popup, Grid, Image} from 'semantic-ui-react'
import MarkerPopup from './MarkerPopup'
import {showHideModalAction} from '../actions/showHideModalAction'
import {PieChart , Pie ,Legend, Tooltip  } from 'Recharts'
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
        const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
            {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
            {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

        const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
            {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
            {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

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
        /* */

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
                                <h3>{showDeviceDetails()}</h3>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={8}>
                                    {/* <PieChart width={800} height={400}>
                                        <Pie isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
                                        <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
                                        <Tooltip/>
                                    </PieChart>
                                     */}
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
