import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Button,
  Gap,
  IndicatorTemp,
  IndicatorTime,
  Chart,
  IndicatorAir,
} from '../components';
import {Colors} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

import IconMa from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import {getData, updateButtonHome} from '../api';
import {ThemeContext} from '../../App';

const screen = Dimensions.get('screen');
const HomeScreen = ({navigation}) => {
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
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View>
          <IndicatorTime />
          <Gap height={20} />
          {/* <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.3,
              flex: 1,
              width: screen.width,
              height: screen.height,
            }}>
            <Image
              style={{
                width:
                  context.type == 'Tablet'
                    ? screen.width * 0.9
                    : screen.width * 0.8,
                height:
                  context.type == 'Tablet'
                    ? screen.width * 0.3
                    : screen.height * 0.7,
              }}
              source={require('../assets/gesegnet.png')}
            />
          </View> */}
          <Button
            paddingHorizontal={context.type == 'Tablet' ? 10 : 5}
            paddingVertical={context.type == 'Tablet' ? 20 : 15}
            fontSize={context.type == 'Tablet' ? 30 : 15}
            onPress={() => navigation.navigate('Light')}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: context.type == 'Tablet' ? screen.width * 0.7 : '100%',
              height:
                context.type == 'Tablet'
                  ? screen.width * 0.7
                  : screen.width * 0.9,
              borderRadius: moderateScale(10),
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {data?.dw1 ? (
              <Chart
                data={data}
                width={screen.width * 0.7}
                height={
                  context.type == 'Tablet'
                    ? screen.width * 0.24
                    : screen.width * 0.19
                }
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}>
          <IndicatorTemp
            data={data.t1}
            Icons={() => (
              <Icon
                name="thermometer-outline"
                color={Colors.dark}
                size={moderateScale(20)}
              />
            )}
          />
          <IndicatorTemp
            unit="RH"
            data={data.h1}
            Icons={() => (
              <Icon name="water" color={Colors.dark} size={moderateScale(20)} />
            )}
          />
          <IndicatorAir
            icon={true}
            data={data.a1}
            Icons={() => (
              <IconMa name="fan" color="white" size={moderateScale(20)} />
            )}
          />
          <View
            style={{
              width: context.type == 'Tablet' ? screen.width * 0.19 : '20%',
              justifyContent: 'center',
              alignItems: 'stretch',
              flexDirection: 'row',
            }}>
            <Button
              backgroundColor={data.sa1 == 0 ? Colors.red : Colors.green}
              text={data.sa1 == 0 ? 'Disable' : 'Enable'}
              flex={1}
              fontSize={24}
              onPress={() => updateButtonHome('sa1', data.sa1)}
            />
          </View>
        </View>
        <Gap height={context.type == 'Tablet' ? 20 : 10} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}>
          <IndicatorTemp
            data={data.t2}
            Icons={() => (
              <Icon
                name="thermometer-outline"
                color={Colors.dark}
                size={moderateScale(20)}
              />
            )}
          />
          <IndicatorTemp
            unit="RH"
            data={data.h2}
            Icons={() => (
              <Icon name="water" color={Colors.dark} size={moderateScale(20)} />
            )}
          />
          <IndicatorAir
            data={data.a2}
            icon={true}
            Icons={() => (
              <IconMa name="fan" color="white" size={moderateScale(20)} />
            )}
          />
          <View
            style={{
              width: context.type == 'Tablet' ? screen.width * 0.19 : '20%',
              justifyContent: 'center',
              alignItems: 'stretch',
              flexDirection: 'row',
            }}>
            <Button
              backgroundColor={data.sa2 == 0 ? Colors.red : Colors.green}
              text={data.sa2 == 0 ? 'Disable' : 'Enable'}
              flex={1}
              fontSize={24}
              onPress={() => updateButtonHome('sa2', data.sa2)}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
