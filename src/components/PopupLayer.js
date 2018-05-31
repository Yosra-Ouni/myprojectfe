import React from "react"
import store from '../store'
import {connect} from "react-redux"
import 'semantic-ui-css/semantic.min.css'
import MarkerPopup from "./MarkerPopup"
import MultipleMarkerPopup from "./MultipleMarkerPopup"

@connect((store) => {
    return {
        deviceToPopup: store.mainReducer.deviceToPopup,
        devicePopup: store.mainReducer.showPopup,
    }
})
class PopupLayer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("===PopupLayer====>", this.props)


        let listOfPopups = () => {


            if (this.props.deviceToPopup === undefined) {
                console.log(this.props.device)
                if (this.props.items === undefined) {
                    console.log("yohooo")
                    return (<MarkerPopup device={this.props.device} hash={this.props.hash}/>)
                } else {
                    return (<MultipleMarkerPopup items={this.props.items}/>)
                }
            } else {
                return (<MarkerPopup device={this.props.deviceToPopup} showPopup={this.props.devicePopup}
                                     hash={this.props.hash}/>)
            }
        }


        return (
            <div>
                {listOfPopups()}
            </div>
        )
    }

}

export default PopupLayer