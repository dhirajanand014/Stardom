
import PushNotification from "react-native-push-notification";
import { notificationConsts, stringConstants } from "../constants/Constants";
import { getAndroidLocalNotificationDetails, getNotificationChannelCreation } from "../helper/Helper";

export const showNotification = (remoteMessage) => {
    PushNotification.localNotification(getAndroidLocalNotificationDetails(remoteMessage));
}

export const handleCancelNotification = () => {
    PushNotification.cancelAllLocalNotifications()
    PushNotification.removeAllDeliveredNotifications();
}

export const createChannel = () => {
    PushNotification.createChannel(getNotificationChannelCreation(),
        (created) => console.log(`${notificationConsts.CREATE_CHANNEL_CREATE}${stringConstants.SPACE}'${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
}