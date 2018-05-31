
export const markerPopupAction = (dispatch, showPopup, device , items) => {
    return dispatch({
        type: 'MARKER_POPUP_ACTION',
        payload:{showPopup,device, items}

    })
}
