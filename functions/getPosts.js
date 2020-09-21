const functions = require('firebase-functions');
const admin = require("firebase-admin");

exports.getPosts = functions.https.onCall(async (data, context) => {
  try {
    const postsRef = await admin.firestore().collection('posts').get();

    const posts = postsRef.docs.map(doc => {
      return {
        id: doc.id,
        title: doc.data().title,
        text: doc.data().text
      }
    })

    return posts;
  } catch (error) {
    functions.logger.error(error);
  }
  
  throw new functions.https.HttpsError('internal');
});
