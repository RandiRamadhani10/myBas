import React, {useState, useEffect, useContext, scrollView} from 'react';
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
  IndicatorTime,
  SwiperBase,
} from '../components';

import {getData} from '../api';
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons';

const screen = Dimensions.get('screen');

const Monitoring = ({navigation}) => {
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
            flexDirection: 'row',
          },
          context.type !== 'Tablet' && {height: screen.height * 0.29},
        ]}>
        <IndicatorTime />
        <Gap width={30} />
        <View
          style={{
            flexDirection: 'column',
            height: screen.height * 0.2,
            width: screen.height * 0.3,
          }}>
          <ButtonIcon
            size={context.type == 'Tablet' ? 50 : 30}
            flex={1}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Gap width={30} />
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={styles.item}>
            <Text
              style={{
                fontSize: moderateScale(24),
                color: 'white',
              }}>
              Active Power
            </Text>
            <Text
              style={{
                fontSize: moderateScale(24),
                color: 'white',
              }}>
              {data.ap}  kW
            </Text>
          </View>
          <View style={styles.item}>
            <IconMa
              name="lightning-bolt"
              color="white"
              size={moderateScale(20)}
            />
            <Text
              style={{
                fontSize: moderateScale(24),
                color: 'white',
              }}>
              {data.kwh}  kwH
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1, paddingVertical: 20, justifyContent: 'center'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 20,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: screen.height * 0.2,
            }}>
            <IndicatorAir
              icon={true}
              data={data.vr}
              title="Voltage R"
              unit="V"
              Icons={() => (
                <IconMa
                  name="lightning-bolt"
                  color="white"
                  size={moderateScale(20)}
                />
              )}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: screen.height * 0.2,
            }}>
            <IndicatorAir
              icon={true}
              data={data.vs}
              title="Voltage S"
              unit="V"
              Icons={() => (
                <IconMa
                  name="lightning-bolt"
                  color="white"
                  size={moderateScale(20)}
                />
              )}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: screen.height * 0.2,
            }}>
            <IndicatorAir
              icon={true}
              data={data.vt}
              title="Voltage T"
              unit="V"
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 20,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: screen.height * 0.2,
            }}>
            <IndicatorAir
              icon={true}
              data={data.cr}
              title="Curent R"
              unit="A"
              Icons={() => (
                <IconMa
                  name="lightning-bolt"
                  color="white"
                  size={moderateScale(20)}
                />
              )}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: screen.height * 0.2,
            }}>
            <IndicatorAir
              icon={true}
              data={data.cs}
              title="Curent S"
              unit="A"
              Icons={() => (
                <IconMa
                  name="lightning-bolt"
                  color="white"
                  size={moderateScale(20)}
                />
              )}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: screen.height * 0.2,
            }}>
            <IndicatorAir
              icon={true}
              data={data.ct}
              title="Curent T"
              unit="A"
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
      </View>
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
export default Monitoring;
