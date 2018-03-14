import SideBarAction from '../actions/SideBarAction';
const reducer = (state = { visible: false },  action) => {
    switch (action.type) {
        case  "SIDEBAR_ACTION": {
            toggleVisibility = () => this.setState({visible: !this.state.visible})
        }
        default:
            return state
    }
}
 export default reducer