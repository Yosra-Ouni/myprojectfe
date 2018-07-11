export const globalNotificationAction = (dispatch,showGlobalNotif, msg) => {
    return dispatch({
        type: 'GLOBAL_NOTIFICATION_ACTION',
        payload:{showGlobalNotif,  msg}

    })
}
