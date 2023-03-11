import database from '@react-native-firebase/database';
const base = 'a';
export const updateButtonHome = (prop, data) => {
  const status = data == 1 ? 0 : 1;
  const obj = {};
  obj[`${prop}`] = status;
  database().ref(`${base}`).update(obj);
};
export const updateLight = (prop, data, closeButton) => {
  const obj = {};
  obj[`sys${prop}`] = data.sys;
  obj[`tm${prop}`] = data.tm;
  obj[`sv${prop}`] = 1;
  console.log(obj);
  database().ref(`${base}`).update(obj);
};
export const getData = setData => {
  database()
    .ref(`${base}`)
    .on('value', snapshot => {
      setData(snapshot.val());
    });
};
export const getBell = setData => {
  database()
    .ref(`${base}/bell`)
    .on('value', snapshot => {
      setData(snapshot.val());
      console.log(snapshot.val());
    });
};
export const updateBell = () => {
  database().ref(`${base}`).update({bell: 0});
};
export const updateSwitchLight = (data, index) => {
  const myObj = {};
  myObj[`sl${index}`] = data;
  database().ref(`${base}`).update(myObj);
};
