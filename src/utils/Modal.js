import Modal from 'react-native-modal';
import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../../App';
import {Colors} from './Colors';
import {moderateScale} from 'react-native-size-matters';
import {Button, Gap} from '../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {Picker} from 'react-native-wheel-pick';
import {updateLight} from '../api';
export const Modals = () => {
  const {context, setContext} = useContext(ThemeContext);
  const str = context.dataDB.tm;
  const arr = str?.split('/');
  arr?.pop();
  const [offHour, setOffHour] = useState(arr ? arr[0] : '');
  const [offMinute, setOffMinute] = useState(arr ? arr[1] : '');
  const [onMinute, setOnMinute] = useState(arr ? arr[2] : '');
  const [onHour, setOnHour] = useState(arr ? arr[4] : '');
  const [sysButton, setSysButton] = useState(context.dataDB?.sys);
  const closeButton = () => setContext({...context, modalOpen: false});
  const hour = [];
  const minute = [];
  for (let i = 0; i <= 23; i++) {
    hour.push(i < 10 ? `0${i}` : `${i}`);
  }
  for (let i = 0; i <= 59; i++) {
    minute.push(i < 10 ? `0${i}` : `${i}`);
  }
  const styles = StyleSheet.create({
    list: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'relative',
      alignSelf: 'center',
      width: '100%',
      backgroundColor: Colors.dark,
      borderRadius: moderateScale(10),
    },
    list2: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      alignSelf: 'center',
      width: '100%',
      backgroundColor: Colors.dark,
      borderRadius: moderateScale(10),
    },
    listDetail: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 0,
      backgroundColor: Colors.base,
      padding: moderateScale(10),
      borderRadius: moderateScale(5),
      marginBottom: moderateScale(15),
    },
    text: {color: 'white', fontSize: moderateScale(16), fontWeight: 'bold'},
    text1: {
      color: 'white',
      fontSize:
        context.type == 'Tablet' ? moderateScale(16) : moderateScale(12),
      textAlign: 'center',
    },

    text2: {
      color: 'white',
      fontSize: moderateScale(13),
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: moderateScale(4),
    },
    picker: {
      backgroundColor: Colors.base,
      width: 100,
      height:
        context.type == 'Tablet' ? moderateScale(150) : moderateScale(100),
    },
    btnHeader: {
      flexDirection: 'row',
      width: '100%',
      overflow: 'hidden',
      borderTopLeftRadius: moderateScale(10),
      borderTopRightRadius: moderateScale(10),
    },
  });
  useEffect(() => {
    setSysButton(context.dataDB?.sys);
  }, []);
  return (
    <Modal
      isVisible={context.modalOpen}
      onBackdropPress={() => setContext({...context, modalOpen: false})}
      coverScreen={false}
      hasBackdrop={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.base,
          borderRadius: moderateScale(10),
          justifyContent: 'space-between',
          elevation: 8,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            alignSelf: 'center',
          }}>
          <View style={styles.list2}>
            <View style={styles.btnHeader}>
              <Button
                paddingHorizontal={5}
                paddingVertical={context.type == 'Tablet' ? 15 : 5}
                fontSize={13}
                text="Sun Intensity"
                borderRadius={0}
                flex={1}
                backgroundColor={
                  context.dataDB?.sys == '1'
                    ? Colors.darkBlue2
                    : Colors.darkBlue
                }
                color={context.dataDB?.sys == '1' ? 'gray' : 'white'}
                disabled={context.dataDB?.sys == '1' ? true : false}
                onPress={() => {
                  setContext({
                    ...context,
                    dataDB: {
                      ...context.dataDB,
                      sys: context.dataDB?.sys == '1' ? '0' : '1',
                    },
                  });
                }}
              />
              <Button
                paddingHorizontal={5}
                paddingVertical={context.type == 'Tablet' ? 15 : 5}
                fontSize={13}
                text="Schedule"
                borderRadius={0}
                color={context.dataDB?.sys == '0' ? 'gray' : 'white'}
                flex={1}
                backgroundColor={
                  context.dataDB?.sys == '0'
                    ? Colors.darkBlue2
                    : Colors.darkBlue
                }
                disabled={context.dataDB?.sys == '0' ? true : false}
                onPress={() => {
                  setContext({
                    ...context,
                    dataDB: {
                      ...context.dataDB,
                      sys: context.dataDB?.sys == '0' ? '1' : '0',
                    },
                  });
                }}
              />
            </View>
            <Gap height={30} />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-evenly',
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={[styles.text1, {fontWeight: 'bold'}]}>
                  Timer On
                </Text>
                <Gap height={10} />
                <View style={styles.listDetail}>
                  <View style={{}}>
                    <Text style={styles.text1}>Hour</Text>
                    <Picker
                      style={styles.picker}
                      textSize={context.type == 'Tablet' ? 30 : 15}
                      textColor="white"
                      selectedValue={arr ? arr[0] : ''}
                      pickerData={hour}
                      onValueChange={value => setOnHour(value)}
                    />
                  </View>
                  <Text
                    style={[
                      styles.text,
                      {marginHorizontal: moderateScale(20)},
                    ]}>
                    :
                  </Text>
                  <View style={{}}>
                    <Text style={styles.text1}>Minute</Text>
                    <Picker
                      style={styles.picker}
                      textSize={context.type == 'Tablet' ? 30 : 15}
                      textColor="white"
                      selectedValue={arr ? arr[1] : ''}
                      pickerData={minute}
                      onValueChange={value => setOnMinute(value)}
                    />
                  </View>
                </View>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={[styles.text1, {fontWeight: 'bold'}]}>
                  Timer Off
                </Text>
                <Gap height={10} />
                <View style={styles.listDetail}>
                  <View style={{}}>
                    <Text style={styles.text1}>Hour</Text>
                    <Picker
                      style={styles.picker}
                      textSize={context.type == 'Tablet' ? 30 : 15}
                      textColor="white"
                      selectedValue={arr ? arr[2] : ''}
                      pickerData={hour}
                      onValueChange={value => setOffHour(value)}
                    />
                  </View>
                  <Text
                    style={[
                      styles.text,
                      {marginHorizontal: moderateScale(20)},
                    ]}>
                    :
                  </Text>
                  <View style={{}}>
                    <Text style={styles.text1}>Minute</Text>
                    <Picker
                      style={styles.picker}
                      textSize={context.type == 'Tablet' ? 30 : 15}
                      textColor="white"
                      selectedValue={arr ? arr[3] : ''}
                      pickerData={minute}
                      onValueChange={value => setOffMinute(value)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Gap height={15} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(10),
            paddingBottom: moderateScale(10),
          }}>
          <Button
            text="Close"
            paddingVertical={5}
            backgroundColor={Colors.red}
            fontSize={context.type == 'Tablet' ? 30 : 20}
            flex={1}
            onPress={() => closeButton()}
          />
          <Gap width={15} />
          <Button
            text="Simpan"
            paddingVertical={5}
            flex={1}
            fontSize={context.type == 'Tablet' ? 30 : 20}
            onPress={() => {
              const timer = `${onHour}/${onMinute}/${offHour}/${offMinute}/!`;
              updateLight(context.index, {sys: context.dataDB.sys, tm: timer});
              closeButton();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
