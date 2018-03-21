import React from "react"
import {connect} from "react-redux"
import store from '../store'
import 'semantic-ui-css/semantic.min.css'
import {Button, Icon, popup} from 'semantic-ui-react'
import Control from 'react-leaflet-control'
import {Marker, Popup} from 'react-leaflet'
import {showHideModalAction} from "../actions/showHideModalAction"
@connect((store) => {
    return {
        showModal: store.mainReducer.showModal,
    }
})

class MultipleMarkerPopup extends React.Component {

    render() {
        const showModal = false
        const icon = (device) => {
            if (device.type === "device") return <Icon size={"large"} name={"selected radio"}/>
            else if (device.type === "dc") return <Icon name={"database"}/>
        }
        const listOfSameGps = () => {
            if (this.props.items != undefined) {
                return (
                    <ul>
                        {this.props.items.map((device, i) => {
                            return [(
                                <div key={i}>
                                    {icon(device)}
                                    {device.type}
                                    {device.id}
                                    <Button content='Show Popup' primary size={'mini'} onClick={() => this.props.dispatch(showHideModalAction(this.props.dispatch, {showModal}, device))}/>
                                </div>
                            )]
                        })

                        }
                    </ul>
                )

            }
        }

        return (
            <Popup>
                <div>


                    {/*<GridList cols={4} >*/}
                    {listOfSameGps()}
                    {/*</GridList>*/}

                </div>
            </Popup>
        )
    }
}

export default MultipleMarkerPopup