import firebase from '../firebase';

async function onSuccessfulLogin(user) {
  try {
    let userInfo = await firebase.db
      .collection('userInfo')
      .doc(user.uid)
      .get();

    userInfo = userInfo.data()

    if (!userInfo) {
      userInfo = await setUserDetail({ nickname: `anonym-${user.uid}`, avatarId: 1 })
    }

    return { ...user, ...userInfo }
  } catch (error) {
    console.error(error);
  }
}

async function setUserDetail(userDetail) {
  try {
    const callable = firebase.functions.httpsCallable('updateUserInfo');
    const result = await callable(userDetail);

    return result;
  } catch (error) {
    console.error(error);
  }
}

function onUserDetailChange(callback, user) {
  return firebase.db
    .collection('userInfo')
    .doc(user.uid)
    .onSnapshot((snapshot) => {
      const data = snapshot.data();

      if (data) {
        callback(data);
      }
    })
}


export default { onSuccessfulLogin, setUserDetail, onUserDetailChange }