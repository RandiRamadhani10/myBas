import Modal from 'react-native-modal';
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {ThemeContext} from '../../App';
import {Colors} from './Colors';
import {moderateScale} from 'react-native-size-matters';
import {Button, Gap} from '../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {getDataTm, updateLight, updateRoom} from '../api';
import moment from 'moment';

const ModalRoom = () => {
  const {context, setContext} = useContext(ThemeContext);
  const [name, setName] = useState(context.name);
  const [loading, setLoading] = useState(false);
  const closeButton = () => {
    setContext({...context, modalOpenRoom: false});
    setLoading(false);
  };
  return (
    <>
      <Modal
        isVisible={context.modalOpenRoom}
        onBackdropPress={() =>
          setContext({...context, modalOpenRoom: false, name: ''})
        }>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {loading ? (
            <View
              style={{
                height: '100%',
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={100} color="#2077fa" />
            </View>
          ) : (
            <View
              style={{
                margin: 10,
                padding: 20,
                backgroundColor: Colors.darkBlue2,
                borderRadius: 10,
                flex: 1,
              }}>
              <TextInput
                style={styles.input}
                placeholder="Nama Ruangan"
                value={context.name}
                onChangeText={text => setContext({...context, name: text})}
              />
              <Gap height={10} />
              <View style={{flexDirection: 'row', gap: 10}}>
                <Button
                  text="Close"
                  paddingVertical={5}
                  backgroundColor={Colors.red}
                  fontSize={context.type == 'Tablet' ? 30 : 20}
                  flex={1}
                  onPress={() =>
                    setContext({...context, modalOpenRoom: false, name: ''})
                  }
                />
                <Button
                  text="Simpan"
                  paddingVertical={5}
                  backgroundColor={Colors.blue}
                  fontSize={context.type == 'Tablet' ? 30 : 20}
                  flex={1}
                  onPress={() => {
                    setLoading(true);
                    updateRoom(
                      context.index,
                      {name: context.name},
                      closeButton,
                    );
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 60,
    borderColor: Colors.blue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    fontSize: 30,
  },
});
export default ModalRoom;
