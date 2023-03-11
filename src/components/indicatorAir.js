import React, {useContext} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Colors} from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../App';
const screen = Dimensions.get('screen');
const IndicatorAir = ({
  unit = '%',
  title = 'Air Fresh',
  icon = false,
  Icons,
  data,
  isTablet = true,
}) => {
  const {context, setContext} = useContext(ThemeContext);
  const width = isTablet == false ? '40%' : '20%';
  const font = isTablet == false ? 30 : 20;
  return (
    <View
      style={styles.container(
        context.type == 'Tablet' ? screen.width * 0.19 : width,
      )}>
      <View>
        <Text style={[styles.text, {fontSize: moderateScale(20)}]}>
          {icon && <Icons />} {title}
        </Text>
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
          <Text
            style={[
              styles.text,
              {
                fontSize:
                  context.type == 'Tablet'
                    ? moderateScale(40)
                    : moderateScale(font),
              },
            ]}>
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
export default IndicatorAir;
