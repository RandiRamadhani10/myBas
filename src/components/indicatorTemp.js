import React, {useContext} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {Colors} from '../utils';
import {ThemeContext} from '../../App';
const screen = Dimensions.get('screen');
const IndicatorTemp = ({unit = '°C', Icons, data}) => {
  const {context, setContext} = useContext(ThemeContext);
  return (
    <View
      style={styles.container(
        context.type == 'Tablet' ? screen.width * 0.19 : '20%',
      )}>
      <View>
        <View style={styles.button}>
          <Icons />
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text style={[styles.text, {fontSize: moderateScale(40)}]}>
            {data}
          </Text>
          <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
            {unit}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: width => ({
    padding: moderateScale(10),
    backgroundColor: Colors.base,
    flexDirection: 'row',
    width: width,
    borderRadius: moderateScale(5),
  }),
  button: {
    width: moderateScale(30),
    height: moderateScale(30),
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
export default IndicatorTemp;
