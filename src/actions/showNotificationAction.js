
export const showNotificationAction = (dispatch, showNotif, msg) => {
    return dispatch({
        type: 'SHOW_NOTIFICATION_ACTION',
        payload:{ showNotif,msg}

    })
}