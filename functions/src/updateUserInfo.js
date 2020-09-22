const functions = require('firebase-functions');
const admin = require("firebase-admin");

exports.updateUserInfo = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You need to authenticate for this action')
  }

  if (!data.nickname) {
    throw new functions.https.HttpsError('unauthenticated', 'Nickname required')
  }

  if (!data.avatarId) {
    throw new functions.https.HttpsError('unauthenticated', 'Avatar required')
  }

  try {
    const userInfoRef = admin
      .firestore()
      .collection('userInfo');

    await userInfoRef.doc(context.auth.uid).set({
      nickname: data.nickname,
      avatarId: data.avatarId,
    });

    const userInfo = await userInfoRef.doc(context.auth.uid).get();

    return userInfo.data();
  } catch (error) {
    functions.logger.error(error);
  }

  throw new functions.https.HttpsError('internal');
});
