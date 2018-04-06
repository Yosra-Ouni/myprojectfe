import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, Header, Modal, popup, Grid, Image} from 'semantic-ui-react'
import MarkerPopup from './MarkerPopup'
import {showHideModalAction} from '../actions/showHideModalAction'
import {PieChart, Pie, Legend, Tooltip, Cell, LineChart, XAxis, YAxis, Line, CartesianGrid} from 'Recharts'
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
        showModal: false,

    }


    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    handleClose = () => this.props.dispatch(showHideModalAction(this.props.dispatch, this.state.showModal))

    render() {
        const data = this.props.random
        const modalOpen = this.props.modalOpen && true
        const data01 = [{name: 'failed', value: data}, {name: 'success', value: 10 - data}, {
            name: 'conceled',
            value: 0
        }]
        const data02 = [
            {name: 'Jan', x: data},
            {name: 'Feb ', x: 10-data},
            {name: 'Mar ', x: 7},
            {name: 'Apr ', x: 6},
            {name: 'Mai ', x: 5},
            {name: 'Jun ', x: 1},
            {name: 'Jul ', x: 3},
            {name: 'Aug ', x: 5},
            {name: 'Sep ', x: 9},
            {name: 'Oct ', x: 10},
            {name: 'Nov ', x: 0},
            {name: 'Dec ', x: 6},

        ];
        const COLORS = [  '#8884d8' ,'#00C49F','#0088FE','#82ca9d']

        const icon = () => {
            if (this.props.device.type === "device") return <Icon name={"selected radio"}/>
            else if (this.props.device.type === "dc") return <Icon name={"database"}/>
        }
        const showDeviceDetails = () => {
            if (this.props.device != undefined) {
                return (
                    <div>
                        {icon()} {this.props.device.type} {this.props.device.serialNumber}<br/>
                        < Icon name={"marker"}/> ( {this.props.device.gps.lat} , {this.props.device.gps.lng} ) <br/>
                        < Icon name={"location arrow"}/> {this.props.device.address} <br/>
                        < Icon name={"map"}/> {this.props.device.region} <br/>

                    </div>
                )
            }
        }
        /* */

        return (
            <Modal
                open={modalOpen}
                onClose={this.handleClose}
                size='large'
                //dimmer={"inverted"}
            >
                <Header icon='plus' content='Equipment details'/>
                <Modal.Content>
                    <div>
                        <Grid celled='internally'>
                            <Grid.Row>
                                <Grid.Column>
                                    <h3>{showDeviceDetails()}</h3>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <PieChart width={600} height={300}>
                                        <Pie dataKey={'value'} data={data01} cx={200} cy={200} innerRadius={40}
                                             outerRadius={80} fill="#82ca9d" label>
                                            {
                                                data01.map((entry, index) => <Cell key={index}
                                                                                   fill={COLORS[index % COLORS.length]}/>)
                                            }
                                        </Pie>
                                        <Tooltip/>
                                    </PieChart>

                                </Grid.Column>
                                <Grid.Column width={8}>
                                     <LineChart width={500} height={300} data={data02}
                                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Tooltip/>
                                        <Legend />
                                        <Line type="monotone" dataKey="x" stroke="#8884d8" activeDot={{r: 8}}/>
                                    </LineChart>
                                </Grid.Column>
                            </Grid.Row>
                            {/* <Grid.Row>
                                <Grid.Column width={8}>

                                </Grid.Column>
                                <Grid.Column width={8}>

                                </Grid.Column>
                            </Grid.Row>*/}
                        </Grid>

                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button //color='blue'
                        color='teal'
                        onClick={this.handleClose}
                        //inverted
                        >
                        <Icon name='checkmark'/> Done
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}


export default EquipmentModal
