export const showHideAlarmsModalAction = (dispatch, showActionModal, device)  => {
    return dispatch({
        type: 'SHOW_HIDE_ALARMS_MODAL_ACTION',
        payload:{ showActionModal,device}
    })
}

