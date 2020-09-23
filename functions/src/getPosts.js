const functions = require('firebase-functions');
const admin = require("firebase-admin");

exports.getPosts = functions.https.onCall(async (data, context) => {
  try {
    const lastDocId = data ? data.lastDocId : null;
    let lastDoc = null;
    let postRef = admin
      .firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(10);

    if (lastDocId) {
      lastDoc = await admin.firestore().collection('posts').doc(lastDocId).get();

      if (!lastDoc.data()) {
        functions.logger.warn(`Starting point doc not found for ${lastDocId}.`);
        return [];
      }

      postRef = postRef.startAfter(lastDoc);
    }

    const postsDocs = await postRef.get();

    const posts = postsDocs.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        text: data.text,
        userNickname: data.userNickname,
        userAvatarId: data.userAvatarId,
        createdAt: doc.createTime
      }
    });

    const result = {
      posts,
      hasMore: posts.length < 10
    }

    return result;
  } catch (error) {
    functions.logger.error(error);
  }
  
  throw new functions.https.HttpsError('internal');
});
