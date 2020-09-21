const functions = require('firebase-functions');
const admin = require("firebase-admin");

exports.addPost = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated')
  }

  if (!data.title) {
    throw new functions.https.HttpsError('unauthenticated', 'title required')
  }

  if (!data.text) {
    throw new functions.https.HttpsError('unauthenticated', 'text required')
  }

  try {
    const postsRef = await admin.firestore().collection('posts');

    const post = await postsRef.add({
      title: data.title,
      text: data.text,
      user: context.auth.uid,
      createdAt: new Date()
    })

    return post.id;
  } catch (error) {
    functions.logger.error(error);
  }

  throw new functions.https.HttpsError('internal');
});
