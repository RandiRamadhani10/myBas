/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {Colors} from './src/utils';
import Router from './src/router';
export const ThemeContext = createContext({});
import Sound from 'react-native-sound';
import {getBell, updateBell} from './src/api';
import SplashScreen from 'react-native-splash-screen';
import FullScreenChz from 'react-native-fullscreen-chz';
let whoosh = new Sound('bell.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

const App = () => {
  const [context, setContext] = useState({
    modalOpen: false,
    dataDB: {},
    index: '',
    type: '',
  });
  const [bell, setBell] = useState();
  useEffect(() => {
    getBell(setBell);
  }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const playsound = () => {
    Alert.alert('Bell Berbunyi!', 'Ada Orang Datang', [
      {
        text: 'Ok',
        onPress: () => {
          whoosh.stop();
          updateBell();
        },
      },
    ]);
    whoosh.play(success => {
      if (success) {
        updateBell();
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };
  useEffect(() => {
    // Masuk ke mode penuh layar ketika komponen did mount
    FullScreenChz.enable();
    return () => {
      // Keluar dari mode penuh layar ketika komponen akan unmount
      FullScreenChz.disable();
    };
  }, []);
  return (
    <ThemeContext.Provider value={{context, setContext}}>
      {bell == 1 && playsound()}
      <Router />
    </ThemeContext.Provider>
  );
};

export default App;
