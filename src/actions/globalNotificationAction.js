export const globalNotificationAction = (dispatch, msg,showGlobalNotif) => {
    return dispatch({
        type: 'GLOBAL_NOTIFICATION_ACTION',
        payload:{msg, showGlobalNotif}

    })
}
