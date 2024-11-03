import notifee, {EventType} from '@notifee/react-native';

notifee.onForegroundEvent(({type, detail}) => {
  switch (type) {
    case EventType.ACTION_PRESS:
      if (detail?.pressAction?.id === 'water-intake') {
        console.log('DRINK ACTION 💦 FOREGROUND');
      }
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log(type, detail);
  if (
    type === EventType.ACTION_PRESS &&
    detail?.pressAction?.id === 'water-intake'
  ) {
    console.log('DRINK ACTION 💦 BACKGROUND');
  }
});
