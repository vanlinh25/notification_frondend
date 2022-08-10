import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import {getUniqueId} from 'react-native-device-info';
const App = () => {
  useEffect(() => {
    // Get the device token

    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log(token);
        const deviceId = await getUniqueId();
        await firestore().collection('users').doc(deviceId).set({
          token: token,
        });
        console.log(`add token to ${deviceId}`);
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const {notification} = remoteMessage;
      Toast.show({
        type: 'success',
        text1: notification?.title,
        text2: notification?.body,
      });
    });

    return unsubscribe;
  }, []);
  return (
    <View>
      <Toast />
      <Text>Hello world!</Text>
    </View>
  );
};

export default App;
