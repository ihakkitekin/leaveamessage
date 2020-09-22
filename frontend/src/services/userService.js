import firebase from '../firebase';

function onSuccessfulLogin(authResult, redirectUrl) {
  const { additionalUserInfo, user } = authResult;

  if (additionalUserInfo.isNewUser) {
    // Show New user screen
  } else {
    const userInfo = firebase.db
      .collection('userInfo')
      .doc(user.uid)
      .get()
      .then((snapshot) => snapshot.data())
      .catch(e => {
        console.error(e);
        return null;
      });
  }
}

function setUserDetail(userDetail) {
  // Implement
}


export default { onSuccessfulLogin }