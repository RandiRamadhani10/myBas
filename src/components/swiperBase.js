import React, {useContext} from 'react';
import Swiper from 'react-native-swiper';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import IndicatorTemp from './indicatorTemp';
import IndicatorAir from './indicatorAir';
import IndicatorLight from './indicatorLight';
import Gap from './gap';
import {moderateScale} from 'react-native-size-matters';
import {Timer} from '../utils';
import {ThemeContext} from '../../App';

const screen = Dimensions.get('screen');

const SwiperBase = ({setOpen, data}) => {
  const {context, setContext} = useContext(ThemeContext);
  let dataIndex = 0;
  return (
    <>
      <Swiper style={styles.wrapper} scrollEnabled={true}>
        {Timer.map((dat, index) => {
          return (
            <View key={index} style={styles.slide1}>
              <View style={styles.row}>
                {dat.data.map((dats, index) => {
                  dataIndex++;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.rowItems(
                          context.type == 'Tablet'
                            ? screen.height * 0.2
                            : screen.width * 0.11,
                        ),
                      ]}>
                      <IndicatorLight
                        title={dats.name}
                        data={data}
                        index={dataIndex}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </Swiper>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: moderateScale(10),
  },
  row: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowItems: height => ({
    flexDirection: 'row',
    height: height,
    marginBottom: moderateScale(10),
  }),
});
export default SwiperBase;
