import Modal from 'react-native-modal';
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {ThemeContext} from '../../App';
import {Colors} from './Colors';
import {moderateScale} from 'react-native-size-matters';
import {Button, Gap} from '../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {getDataTm, updateLight} from '../api';
import moment from 'moment';
export const Modals = () => {
  const {context, setContext} = useContext(ThemeContext);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [offHour, setOffHour] = useState('');
  const [offMinute, setOffMinute] = useState('');
  const [onMinute, setOnMinute] = useState('');
  const [onHour, setOnHour] = useState('');
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sysButton, setSysButton] = useState(context.dataDB?.sys);
  const closeButton = () => {
    setContext({...context, modalOpen: false});
    setLoading(false);
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const parseTime = time => {
    const isoDateString = time;
    const parsedTimeUTC = moment.utc(isoDateString);
    const parsedTimeLocal = parsedTimeUTC.local();
    const hours = parsedTimeLocal.format('HH');
    const minutes = parsedTimeLocal.format('mm');
    const formattedTime = `${hours}/${minutes}`;
    return formattedTime;
  };
  const parseHours = time => {
    const dateObject = time;
    // Menggunakan moment.js untuk parsing waktu dalam UTC
    const formattedTime = dateObject.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return formattedTime;
  };
  const getTimeFormat = time => {
    // const dateString = time;
    const dateObject = new Date(time);

    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    const formattedTime = `${hours}/${minutes}/`;
    return formattedTime;
  };
  const parseTimeFirebase = time => {
    const databaseString = time;

    const timeSegments = databaseString.split('/');
    // Mendapatkan jam, menit, dan detik dari masing-masing bagian
    const firstHour = parseInt(timeSegments[0]);
    const firstMinute = parseInt(timeSegments[1]);
    const secondHour = parseInt(timeSegments[2]);
    const secondMinute = parseInt(timeSegments[3]);

    const firstTimeISO = moment
      .utc()
      .set({hour: firstHour, minute: firstMinute, second: 0})
      .toISOString();
    const utcDate1 = new Date(firstTimeISO);
    const localDate1 = new Date(
      utcDate1.getTime() + utcDate1.getTimezoneOffset() * 60000,
    );

    const secondTimeISO = moment
      .utc()
      .set({hour: secondHour, minute: secondMinute, second: 0})
      .toISOString();
    const utcDate2 = new Date(secondTimeISO);
    const localDate2 = new Date(
      utcDate2.getTime() + utcDate2.getTimezoneOffset() * 60000,
    );
    setDate1(localDate1);
    setDate2(localDate2);
  };

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
      opacity: context.manual == 1 ? 1 : 0.3,
    },
  });
  const allStatusDefined =
    onHour !== undefined &&
    onMinute !== undefined &&
    offMinute !== undefined &&
    offHour !== undefined;
  const status = allStatusDefined ? false : true;
  const buttonDisabled = () => {
    if (context.manual == 1) {
      context.dataDB?.sys == '1' ? true : false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    setSysButton(context.dataDB?.sys);
  }, []);
  useEffect(() => {
    context.dataDB.tm && parseTimeFirebase(context.dataDB?.tm);
  }, [context.modalOpen]);

  return (
    <>
      <Modal
        isVisible={context.modalOpen}
        onBackdropPress={() => setContext({...context, modalOpen: false})}
        coverScreen={true}
        hasBackdrop={true}>
        {loading ? (
          <View
            style={{
              height: '100%',
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0000008a',
              borderRadius: 17,
            }}>
            <ActivityIndicator size={100} color="#2077fa" />
          </View>
        ) : (
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
                <View
                  style={styles.btnHeader}
                  pointerEvents={context.manual == 1 ? 'auto' : 'none'}>
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
                    padding: 15,
                    backgroundColor: Colors.darkBlue,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: 15,
                    borderRadius: 10,
                    alignSelf: 'flex-end',
                    marginRight: 20,
                  }}>
                  <Text style={[styles.text1, {fontWeight: 'bold'}]}>
                    Manual
                  </Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={context.manual == 1 ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      setContext({
                        ...context,
                        manual: context.manual == 1 ? 0 : 1,
                      });
                      setDate1(new Date());
                    }}
                    value={context.manual == 1 ? true : false}
                    style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                  />
                  <Text style={[styles.text1, {fontWeight: 'bold'}]}>
                    Automatic
                  </Text>
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
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      opacity: context.manual == 1 ? 1 : 0.3,
                    }}>
                    <Text style={[styles.text1, {fontWeight: 'bold'}]}>
                      Timer On
                    </Text>
                    <Gap height={10} />
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: Colors.blue,
                        borderRadius: 8,
                      }}
                      disabled={context.manual == 1 ? false : true}
                      onPress={() => setOpen1(true)}>
                      <Text
                        style={{
                          fontSize: context.type == 'Tablet' ? 54 : 24,
                          fontWeight: '600',
                          color: 'white',
                        }}>
                        {context.manual == 1 ? parseHours(date1) : '12:00 Am'}
                      </Text>
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={open1}
                      date={date1}
                      mode="time"
                      onConfirm={date => {
                        setOpen1(false);
                        setDate1(date);
                      }}
                      onCancel={() => {
                        setOpen1(false);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      opacity: context.manual == 1 ? 1 : 0.3,
                    }}>
                    <Text style={[styles.text1, {fontWeight: 'bold'}]}>
                      Timer Off
                    </Text>
                    <Gap height={10} />
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: Colors.blue,
                        borderRadius: 8,
                      }}
                      disabled={context.manual == 1 ? false : true}
                      onPress={() => setOpen2(true)}>
                      <Text
                        style={{
                          fontSize: context.type == 'Tablet' ? 54 : 24,
                          fontWeight: '600',
                          color: 'white',
                        }}>
                        {context.manual == 1 ? parseHours(date2) : '12:00 Am'}
                      </Text>
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={open2}
                      date={date2}
                      mode="time"
                      onConfirm={date => {
                        setOpen2(false);
                        setDate2(date);
                        console.log(date);
                      }}
                      onCancel={() => {
                        setOpen2(false);
                      }}
                    />
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
                disabled={status}
                onPress={() => {
                  const timeOn = getTimeFormat(date1);
                  const timeOff = getTimeFormat(date2);
                  let timer =
                    context.manual == 1
                      ? `${timeOn}${timeOff}!`
                      : '00/00/00/01/!';
                  const obj = {};
                  obj[`sys${context.index}`] = context.dataDB.sys;
                  obj[`tm${context.index}`] = timer;

                  if (context.manual == 1) {
                    obj[`sv${context.index}`] = '1';
                  }
                  
                  console.log(obj);
                  updateLight(context.index, obj, closeButton, setLoading, {
                    manual: context.manual,
                  });
                }}
              />
            </View>
          </View>
        )}
      </Modal>
    </>
  );
};
