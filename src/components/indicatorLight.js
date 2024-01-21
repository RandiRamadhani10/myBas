import React, {useState, useEffect, useContext} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {Colors} from '../utils';
import Icon from 'react-native-vector-icons/Feather';
import {BoxShadow} from 'react-native-shadow';
import {ThemeContext} from '../../App';
import {updateSwitchLight} from '../api';

const screen = Dimensions.get('screen');
const IndicatorLight = ({
  unit = '%',
  title = 'Default',
  data = [],
  index,
  indexs,
  handleRefresh,
  manual,
}) => {
  const {context, setContext} = useContext(ThemeContext);
  const obj = {
    tm: data[`tm${index}`],
    sl: data[`sl${index}`],
    sys: data[`sys${index}`],
  };
  const shadowOpt = {
    width: moderateScale(20),
    height: moderateScale(20),
    color: obj.sl == '1' ? Colors.green : Colors.base,
    border: 9,
    radius: 9,
    opacity: 0.3,
    x: 0,
    y: 0,
    style: {marginVertical: 5},
  };
  return (
    <TouchableOpacity
      onPress={() => {
        updateSwitchLight(obj.sl == '1' ? '0' : '1', index);
      }}
      disabled={manual == 0 ? false : true}
      style={[
        styles.container(
          context.type == 'Tablet' ? screen.height * 0.3 : screen.height * 0.45,
        ),
        ,
      ]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={[
            styles.text,
            {fontSize: moderateScale(18), opacity: manual == 0 ? 1 : 0.2},
          ]}>
          {title}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'space-between',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <BoxShadow setting={shadowOpt}>
            <View
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                borderRadius: moderateScale(50),
                backgroundColor: obj.sl == '1' ? Colors.green : Colors.gray,
                opacity: manual == 0 ? 1 : 0.2,
              }}></View>
          </BoxShadow>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setContext({
                ...context,
                modalOpen: true,
                dataDB: obj,
                index: index,
                manual: manual,
              });
            }}>
            {obj?.sys == '1' ? (
              <Icon name="sun" color={Colors.dark} size={moderateScale(20)} />
            ) : (
              <Icon name="clock" color={Colors.dark} size={moderateScale(20)} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setContext({
                ...context,
                modalOpenRoom: true,
                name: title,
                index: index,
              });
            }}>
            <Icon name="edit-3" color={Colors.dark} size={moderateScale(20)} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
export default IndicatorLight;
