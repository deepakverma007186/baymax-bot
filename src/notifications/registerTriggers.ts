import {usePedometerStore} from '@state/pedometerStore';
import {useWaterStore} from '@state/waterStore';
import {createTimeStampNotification} from './utils';
import {IMAGES} from '@assets/images';
import notifee from '@notifee/react-native';

// Morning Alert Timing 6:00 am morning
const MORNING = [6, 0];

// Night Alert Timing 10:00 pm evening
const NIGHT = [22, 0];

const NOTIFICATION_INTERVAL_ID = 'water-reminder';
const DRINK_BETWEEN = [9, 23]; // from 9am to 11pm
const DRINK_INTERVAL = 2; // every two hours

const createHourlyReminders = async () => {
  let counter = 1;
  for (
    let hour = DRINK_BETWEEN[0];
    hour <= DRINK_BETWEEN[1];
    hour += DRINK_INTERVAL
  ) {
    await createTimeStampNotification(
      IMAGES.water,
      'Water Reminder! 💧',
      'Time to drink water! Keep up the good habit!',
      hour,
      0,
      `${NOTIFICATION_INTERVAL_ID}-${counter}`,
    );
    counter++;
  }
};

export const registerAllTriggers = async () => {
  const {waterDrinkStamps, resetWaterIntake} = useWaterStore.getState();
  const {initializeStepsForTheDay} = usePedometerStore.getState();

  initializeStepsForTheDay();

  // Greetings...
  createTimeStampNotification(
    // Good Morning
    IMAGES.gm,
    'Good Morning! 😎',
    'Start your day with positivity',
    MORNING[0],
    MORNING[1],
    'good-morning',
  );
  createTimeStampNotification(
    // Good Night
    IMAGES.gn,
    'Good Night! 🌃🌙',
    'Dream big and make it happen to real life',
    NIGHT[0],
    NIGHT[1],
    'good-night',
  );

  // Walking Reminder
  createTimeStampNotification(
    // Morning
    IMAGES.run,
    'Healthy Walk! 🚶‍➡️🏃‍➡️',
    'Take a step today towards a healthier you!',
    MORNING[0] + 1,
    MORNING[1],
    'daily-morning-walk',
  );
  createTimeStampNotification(
    // Evening
    IMAGES.run,
    'Healthy Walk! 🚶‍➡️🏃‍➡️',
    'Take a step today towards a healthier you!',
    NIGHT[0] - 4,
    NIGHT[1],
    'daily-evening-walk',
  );

  // Water Reminders
  if (waterDrinkStamps.length != 8) {
    await createHourlyReminders();
  } else {
    const notifications = await notifee.getTriggerNotifications();
    let counter = 1;
    for (const notification of notifications) {
      if (
        notification.notification.id ===
        `${NOTIFICATION_INTERVAL_ID}-${counter}`
      ) {
        await notifee.cancelNotification(notification.notification.id);
      }
      counter++;
    }
  }

  // Reset Water Intake Every Day When App Opens
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const isFromPreviousDay = (timestamps: string[]) => {
    if (timestamps.length === 0) return false;
    const lastTimeStamp = new Date(timestamps[timestamps.length - 1]);
    const lastDate = lastTimeStamp.toISOString().split('T')[0];
    return lastDate !== currentDate;
  };

  if (isFromPreviousDay(waterDrinkStamps)) {
    resetWaterIntake();
  }
};
