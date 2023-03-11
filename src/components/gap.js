import React from 'react';
import {View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const Gap = ({width = 0, height = 0}) => {
  return (
    <View
      style={{
        width: moderateScale(width),
        height: moderateScale(height),
      }}></View>
  );
};

export default Gap;
