import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, Lighting, Monitoring} from '../screen';
import DeviceInfo from 'react-native-device-info';
import {ThemeContext} from '../../App';
const Stack = createNativeStackNavigator();

const Router = () => {
  const {context, setContext} = useContext(ThemeContext);
  let type = DeviceInfo.getDeviceType();
  useEffect(() => {
    setContext({...context, type: type});
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Light" component={Lighting} />
        <Stack.Screen name="Monitor" component={Monitoring} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;
