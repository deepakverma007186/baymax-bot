import {IMAGES} from '@assets/images';
import notifee, {
  AndroidAction,
  AndroidImportance,
  AndroidStyle,
  IntervalTrigger,
  RepeatFrequency,
  TimestampTrigger,
  TimeUnit,
  TriggerType,
} from '@notifee/react-native';

export const createTimeStampNotification = async (
  imageUri: string,
  title: string,
  body: string,
  hour: number,
  minute: number,
  notificationId: string,
) => {
  const now = new Date();
  const triggerDate = new Date();

  triggerDate.setHours(hour, minute, 0, 0);

  if (triggerDate <= now) {
    triggerDate.setDate(triggerDate.getDate() + 1);
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerDate.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: true,
  };

  const action: AndroidAction = {
    title: 'View Details',
    pressAction: {
      id: 'view-details',
      launchActivity: 'default',
    },
  };

  await notifee.createTriggerNotification(
    {
      id: notificationId,
      title,
      body,
      android: {
        channelId: 'default',
        sound: 'notification',
        onlyAlertOnce: true,
        smallIcon: 'ic_stat_name',
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: imageUri || IMAGES.launch,
        },
        actions: [action],
      },
      ios: {
        categoryId: 'default',
        attachments: [
          {
            url: imageUri || IMAGES.launch,
            thumbnailHidden: false,
          },
        ],
        interruptionLevel: 'timeSensitive',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
        sound: 'notification.wav',
      },
    },
    trigger,
  );
};

export const createIntervalNotification = async (
  imageUri: string,
  title: string,
  body: string,
  intervalTime: number,
  timeUnit: TimeUnit,
) => {
  const trigger: IntervalTrigger = {
    type: TriggerType.INTERVAL,
    interval: intervalTime,
    timeUnit: timeUnit,
  };

  const action: AndroidAction = {
    title: 'View Details',
    pressAction: {
      id: 'view-details',
      launchActivity: 'default',
    },
  };

  await notifee.createTriggerNotification(
    {
      title,
      body,
      android: {
        channelId: 'default',
        sound: 'notification',
        onlyAlertOnce: true,
        smallIcon: 'ic_stat_name',
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: imageUri || IMAGES.launch,
        },
        actions: [action],
        // importance: AndroidImportance.DEFAULT
      },
      ios: {
        categoryId: 'default',
        attachments: [
          {
            url: imageUri || IMAGES.launch,
            thumbnailHidden: false,
          },
        ],
        // interruptionLevel: 'timeSensitive',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
        sound: 'notification.wav',
      },
    },
    trigger,
  );
};
