import React, {useEffect, useState, } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import moment from 'moment';
import 'moment/locale/id';
import {moderateScale} from 'react-native-size-matters';


const IndicatorTime = () => {


  const [time, setTime] = useState('00 : 00');
  useEffect(() => {
    let secTimer = setInterval(() => {
      const x = new Date();
      let hour = x.getHours();
      let minute = x.getMinutes();
      let ampm = x.getHours() >= 12 ? ' PM' : ' AM';
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      let x3 = `${hour} : ${minute}`;
      setTime(x3);
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize: moderateScale(35)}]}>{time}</Text>
      <Text style={[styles.text, {fontSize: moderateScale(16)}]}>
        {moment().format('dddd [,] Do MMMM YYYY')}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  container: {
    // padding: moderateScale(15),
  },
});
export default IndicatorTime;
