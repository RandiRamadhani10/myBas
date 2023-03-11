import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../utils';

import Icon from 'react-native-vector-icons/FontAwesome';
const ButtonIcon = ({
  color = 'white',
  backgroundColor = Colors.green,
  text = 'Lighting',
  flex = 0,
  fontSize = 30,
  onPress = () => console.log('pressed'),
  size = 50,
}) => {
  return (
    <TouchableOpacity
      style={styles.button(backgroundColor, flex)}
      onPress={onPress}>
      <Icon name="home" color={Colors.dark} size={moderateScale(size)} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: (backgroundColor, flex) => ({
    backgroundColor: backgroundColor,
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    flex: flex,
  }),
});
export default ButtonIcon;
