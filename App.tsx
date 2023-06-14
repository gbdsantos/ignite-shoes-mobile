import { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification
} from 'react-native-onesignal';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { Notification } from './src/components/Notification';

const oneSignalAppId = Platform.OS === 'ios' ? '' : `${process.env.ONESIGNAL_APP_ID}`;

OneSignal.setAppId(oneSignalAppId);

OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [notification, setNotification] = useState<OSNotification | undefined>(undefined);

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification();

        setNotification(response);
      });

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      {notification?.title &&
        <Notification
          title={notification.title}
          onClose={() => setNotification(undefined)}
        />
      }
    </NativeBaseProvider>
  );
}