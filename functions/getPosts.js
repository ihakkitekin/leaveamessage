const functions = require('firebase-functions');
const admin = require("firebase-admin");

exports.getPosts = functions.https.onRequest(async (request, response) => {
  try {
    const postsRef = await admin.firestore().collection('posts').get();

    const posts = postsRef.docs.map(doc => {
      return {
        id: doc.id,
        title: doc.data().title,
        text: doc.data().text
      }
    })
    return response.send(posts);
  } catch (error) {
    functions.logger.error(error);
  }

  return response.sendStatus(500);
});
