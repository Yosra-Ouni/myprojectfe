
export const showHideModalAction = (dispatch, showModal, device) => {
    return dispatch({
        type: 'SHOW_HIDE_MODAL_ACTION',
        payload:{ showModal,device}

    })
}