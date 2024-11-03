import {IMAGES} from '@assets/images';
import notifee, {AndroidStyle} from '@notifee/react-native';

export const addBadgeCount = async () => {
  notifee.setBadgeCount(1).then(() => console.log('Badge Count'));
};

export const displayNotifications = async (
  title: string,
  message: string,
  image: string,
  categoryId: string,
) => {
  // TODO: need to add notification.wav file in ios using xcode
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'notification',
  });

  await notifee.displayNotification({
    title: title,
    body: message,
    android: {
      channelId: channelId,
      sound: 'notification',
      onlyAlertOnce: true,
      smallIcon: 'ic_stat_name',
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture: image || IMAGES.launch,
      },
      actions: [
        {
          title: 'Okay',
          pressAction: {
            id: categoryId,
          },
        },
      ],
    },
    ios: {
      categoryId: categoryId,
      attachments: [
        {
          url: image || IMAGES.launch,
          thumbnailHidden: false,
        },
      ],
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
      sound: 'notification.wav',
    },
  });
};

export const setCategories = async () => {
  await notifee.setNotificationCategories([
    {
      id: 'water-intake',
      actions: [
        {
          id: 'water-intake',
          title: 'Okay',
          foreground: true,
        },
      ],
    },
    {
      id: 'step-count',
      actions: [
        {
          id: 'step-count',
          title: 'Walk & Improve Health',
          foreground: true,
        },
      ],
    },
  ]);
};
