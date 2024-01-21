import database from '@react-native-firebase/database';
const base = 'a';
export const updateButtonHome = (prop, data) => {
  const status = data == 1 ? 0 : 1;
  const obj = {};
  obj[`${prop}`] = status;
  database().ref(`${base}`).update(obj);
};
export const updateLight = (prop, data, closeButton, setLoading, manual) => {
  setLoading(true);
  database()
    .ref(`${base}`)
    .update(data)
    .then(() => {
      database()
        .ref(`dataRoom/${prop}`)
        .update(manual)
        .then(() => {
          closeButton();
        });
    });
};
export const getData = setData => {
  database()
    .ref(`${base}`)
    .on('value', snapshot => {
      setData(snapshot.val());
    });
};
export const getDataRoom = setData => {
  database()
    .ref(`dataRoom`)
    .on('value', snapshot => {
      const res = snapshot.val();
      let filteredArray = res.filter(item => item !== null);
      const chunkSize = 6;
      const chunkedData = filteredArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
      setData(chunkedData);
    });
};
export const updateRoom = (no, data, closeButton) => {
  database()
    .ref(`dataRoom/${no}`)
    .update(data)
    .then(() => {
      closeButton();
    });
};
export const getDataTm = setData => {
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
    });
};
export const updateBell = () => {
  database().ref(`${base}`).update({bell: '0'});
};
export const updateSwitchLight = (data, index) => {
  const myObj = {};
  myObj[`sl${index}`] = data;
  database().ref(`${base}`).update(myObj);
};
