import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import {Colors, Modals} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {ThemeContext} from '../../App';
import {
  Button,
  ButtonIcon,
  Gap,
  IndicatorAir,
  IndicatorTemp,
  IndicatorTime,
  SwiperBase,
} from '../components';

import {getData} from '../api';
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons';

const screen = Dimensions.get('screen');
const Lighting = ({navigation}) => {
  const {context, setContext} = useContext(ThemeContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData(setData);
  }, []);
  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={{
        flex: 1,
        backgroundColor: Colors.dark,
        padding: moderateScale(15),
        position: 'relative',
      }}>
      <StatusBar animated={true} backgroundColor={Colors.dark} />
      {/* <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.08,
          flex: 1,
          width: screen.width,
          height: screen.height,
        }}>
        <Image
          style={{
            width:
              context.type == 'Tablet'
                ? screen.width * 0.9
                : screen.width * 0.9,
            height:
              context.type == 'Tablet'
                ? screen.width * 0.3
                : screen.width * 0.7,
          }}
          source={require('../assets/gesegnet.png')}
        />
      </View> */}
      <View
        style={[
          {
            flex: 0,
            justifyContent: 'space-between',
            flexDirection: 'row',
          },
          context.type !== 'Tablet' && {height: screen.height * 0.29},
        ]}>
        <IndicatorTime />
        {context.type == 'Tablet' ? (
          <View
            style={[
              {
                justifyContent: 'space-between',
                alignItems: 'stretch',
                flexDirection: context.type == 'Tablet' ? 'column' : 'row',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                height: screen.height * 0.2,
              }}>
              <ButtonIcon
                size={context.type == 'Tablet' ? 50 : 30}
                flex={1}
                onPress={() => navigation.goBack()}
              />
            </View>

            <Gap height={15} />
            <View
              style={{
                flexDirection: 'row',
                height: context.type == 'Tablet' ? screen.height * 0.2 : 100,
              }}>
              <IndicatorAir
                icon={true}
                title="kwH"
                unit="   "
                data={data.kwh}
                Icons={() => (
                  <IconMa
                    name="lightning-bolt"
                    color="white"
                    size={moderateScale(20)}
                  />
                )}
              />
            </View>
          </View>
        ) : (
          <View
            style={[
              {
                justifyContent: 'space-between',
                alignItems: 'stretch',
                flexDirection: 'row',
                flex: 1,
              },
            ]}>
            <Gap width={15} />
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <ButtonIcon
                size={context.type == 'Tablet' ? 50 : 70}
                flex={1}
                onPress={() => navigation.goBack()}
              />
            </View>
            <Gap width={15} />
            <View
              style={{
                flex: 1,
              }}>
              <View style={styles.item}>
                <IconMa
                  name="lightning-bolt"
                  color="white"
                  size={moderateScale(20)}
                />
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    color: 'white',
                  }}>
                  {data.kwh} kwH
                </Text>
              </View>
              <View style={styles.item}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      color: 'white',
                    }}>
                    <IconMa name="fan" color="white" size={moderateScale(20)} />
                  </Text>
                  <Gap width={10} />
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      color: 'white',
                    }}>
                    Air Fresh Lantai 1
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    color: 'white',
                  }}>
                  {data.a1} %
                </Text>
              </View>
              <View style={styles.item}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      color: 'white',
                    }}>
                    <IconMa name="fan" color="white" size={moderateScale(20)} />
                  </Text>
                  <Gap width={10} />
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      color: 'white',
                    }}>
                    Air Fresh Lantai 2
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    color: 'white',
                  }}>
                  {data.a2} %
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <Gap height={15} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <SwiperBase data={data} />
        </View>
        <Gap width={15} />
        {context.type == 'Tablet' ? (
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                height: screen.height * 0.2,
              }}>
              <IndicatorAir
                icon={true}
                data={data.a1}
                Icons={() => (
                  <IconMa name="fan" color="white" size={moderateScale(20)} />
                )}
              />
            </View>
            <Gap height={10} />
            <View
              style={{
                flexDirection: 'row',
                height: screen.height * 0.2,
              }}>
              <IndicatorAir
                icon={true}
                data={data.a2}
                Icons={() => (
                  <IconMa name="fan" color="white" size={moderateScale(20)} />
                )}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
      {/* <View
        style={{
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: screen.height * 0.2,
          }}>
          <Button flex={1} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: screen.height * 0.2,
          }}>
          <IndicatorAir unit="   " title="kwH" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: screen.height * 0.2,
          }}>
          <IndicatorAir />
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: screen.height * 0.2,
          }}>
          <IndicatorAir />
        </View>
      </View> */}
      <Modals data={data} />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.base,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'space-between',
    marginBottom: moderateScale(5),
  },
});
export default Lighting;
