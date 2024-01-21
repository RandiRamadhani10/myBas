import React, {useContext, useState, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import IndicatorTemp from './indicatorTemp';
import IndicatorAir from './indicatorAir';
import IndicatorLight from './indicatorLight';
import Gap from './gap';
import {moderateScale} from 'react-native-size-matters';
import {Colors, Timer} from '../utils';
import {ThemeContext} from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getDataRoom} from '../api';
const screen = Dimensions.get('screen');
const SwiperBase = ({setOpen, datas}) => {
  const {context, setContext} = useContext(ThemeContext);
  const [indexScroll, setIndexScroll] = useState(0);
  const [room, setRoom] = useState([]);

  let dataIndex = 0;
  let indexPage;
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const handleIndexChanged = index => {
    setPage(index);
  };
  useEffect(() => {
    getDataRoom(setRoom);
  }, [setRoom]);
  return (
    <>
      <Swiper
        loop={false}
        style={styles.wrapper}
        // loadMinimal={true}
        scrollEnabled={true}
        dotColor="white"
        showsButtons={false}
        showsPagination={false}
        nextButton={
          <Text style={{top: moderateScale(-15)}}>
            <Icon name="chevron-right" size={40} color="white" />
          </Text>
        }
        prevButton={
          <Text style={{top: moderateScale(-15), left: moderateScale(-10)}}>
            <Icon name="chevron-left" size={40} color="white" />
          </Text>
        }>
        {/* 1-6 */}
        {/* {page === 0 ? (
          <View style={styles.slide1}>
            <View style={styles.row}>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar Fawaz 1'}
                  data={data}
                  index={1}
                  indexs={1}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar Fawaz 2 (G)'}
                  data={data}
                  index={2}
                  indexs={2}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar Fawaz 3'}
                  data={data}
                  index={3}
                  indexs={4}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Unknown'}
                  data={data}
                  index={4}
                  indexs={5}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar Anak Utama'}
                  data={data}
                  index={5}
                  indexs={5}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar Sulaeman 2'}
                  data={data}
                  index={6}
                  indexs={6}
                  setIndexScroll={setIndexScroll}
                />
              </View>
            </View>
          </View>
        ) : (
          <></>
        )} */}
        {/* 7-12 */}
        {/* {page === 1 ? (
          <View style={styles.slide1}>
            <View style={styles.row}>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar Sulaeman 3'}
                  data={data}
                  index={7}
                  indexs={7}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar Sulaeman 4'}
                  data={data}
                  index={8}
                  indexs={8}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Tangga LT 1'}
                  data={data}
                  index={9}
                  indexs={9}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Lampu Ruang Keluarga'}
                  data={data}
                  index={10}
                  indexs={10}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Unknown'}
                  data={data}
                  index={11}
                  indexs={11}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Lampu Teras  LT 3'}
                  data={data}
                  index={12}
                  indexs={12}
                  setIndexScroll={setIndexScroll}
                />
              </View>
            </View>
          </View>
        ) : (
          <></>
        )} */}

        {/* 13-18 */}
        {/* {page === 2 ? (
          <View style={styles.slide1}>
            <View style={styles.row}>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar Tangga LT1'}
                  data={data}
                  index={13}
                  indexs={13}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Unknown'}
                  data={data}
                  index={14}
                  indexs={14}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Unknown'}
                  data={data}
                  index={15}
                  indexs={15}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar Amani'}
                  data={data}
                  index={16}
                  indexs={16}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Water Heater'}
                  data={data}
                  index={17}
                  indexs={17}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Jet Pump'}
                  data={data}
                  index={18}
                  indexs={18}
                  setIndexScroll={setIndexScroll}
                />
              </View>
            </View>
          </View>
        ) : (
          <></>
        )} */}

        {/* 19-25 */}
        {/* {page === 3 ? (
          <View style={styles.slide1}>
            <View style={styles.row}>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamr Tidur'}
                  data={data}
                  index={19}
                  indexs={19}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Tangga LT 2'}
                  data={data}
                  index={20}
                  indexs={20}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Teras Depan'}
                  data={data}
                  index={21}
                  indexs={21}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kolam Tengah'}
                  data={data}
                  index={22}
                  indexs={22}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'LG Minibar'}
                  data={data}
                  index={23}
                  indexs={23}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Minibar Jendela'}
                  data={data}
                  index={24}
                  indexs={24}
                  setIndexScroll={setIndexScroll}
                />
              </View>
            </View>
          </View>
        ) : (
          <></>
        )} */}
        {/* 19-25 */}
        {/* {page === 4 ? (
          <View style={styles.slide1}>
            <View style={styles.row}>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Teras Jendela'}
                  data={data}
                  index={25}
                  indexs={25}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar LT 1'}
                  data={data}
                  index={26}
                  indexs={26}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kamar LT 1 (j)'}
                  data={data}
                  index={27}
                  indexs={27}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Teras Kolam'}
                  data={data}
                  index={28}
                  indexs={28}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Minibar'}
                  data={data}
                  index={29}
                  indexs={29}
                  setIndexScroll={setIndexScroll}
                />
              </View>
              <View
                style={[
                  styles.rowItems(
                    context.type == 'Tablet'
                      ? screen.height * 0.2
                      : screen.width * 0.11,
                  ),
                ]}>
                <IndicatorLight
                  title={'Kolam Jembatan'}
                  data={data}
                  index={30}
                  indexs={30}
                  setIndexScroll={setIndexScroll}
                />
              </View>
            </View>
          </View>
        ) : (
          <></>
        )} */}
        {/* <View
          style={styles.slide1}
          onIndexChanged={page => setIndexScroll(page)}>
          <View style={styles.row}> */}
        {room.map(data => (
          <View style={styles.slide1}>
            <View style={styles.row}>
              {data.map((value, index) => (
                <View
                  style={[
                    styles.rowItems(
                      context.type == 'Tablet'
                        ? screen.height * 0.2
                        : screen.width * 0.11,
                    ),
                  ]}>
                  <IndicatorLight
                    title={value.name}
                    data={datas}
                    index={parseInt(value.no)}
                    indexs={parseInt(value.no)}
                    setIndexScroll={setIndexScroll}
                    manual={value.manual}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* {Timer[3].data.map((dats, index) => {
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
                    indexs={index}
                    setIndexScroll={setIndexScroll}
                  />
                </View>
              );
            })} */}
        {/* </View>
        </View> */}
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
