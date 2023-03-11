import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../utils';
const Button = ({
  color = 'white',
  backgroundColor = Colors.orange,
  text = 'Switches',
  flex = 0,
  fontSize = 30,
  onPress = () => console.log('pressed'),
  paddingHorizontal = 10,
  paddingVertical = 20,
  disabled = false,
  opacity = 1,
  borderRadius = 5,
}) => {
  return (
    <TouchableOpacity
      style={styles.button(
        backgroundColor,
        flex,
        paddingHorizontal,
        paddingVertical,
        opacity,
        borderRadius,
      )}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text(color, fontSize)}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text: (color, fontSize) => ({
    color: color,
    fontSize: moderateScale(fontSize),
  }),

  button: (
    backgroundColor,
    flex,
    paddingHorizontal,
    paddingVertical,
    opacity,
    borderRadius,
  ) => ({
    backgroundColor: backgroundColor,
    paddingVertical: moderateScale(paddingVertical),
    paddingHorizontal: moderateScale(paddingHorizontal),
    alignItems: 'center',
    borderRadius: moderateScale(borderRadius),
    justifyContent: 'center',
    flex: flex,
    opacity: opacity,
  }),
});
export default Button;
