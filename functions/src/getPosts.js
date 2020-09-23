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
    const posts = [];
    const userInfoRefs = postsDocs.docs.map(d => d.data().userInfo.get());
    const userInfoDocs = await Promise.all(userInfoRefs);

    for (let i = 0; i < postsDocs.docs.length; i++) {
      const doc = postsDocs.docs[i];
      const userInfoDoc = userInfoDocs[i];
      const data = doc.data();
      const userInfo = userInfoDoc.data();

      posts.push({
        id: doc.id,
        title: data.title,
        text: data.text,
        userNickname: userInfo.nickname,
        userAvatarId: userInfo.avatarId,
        createdAt: doc.createTime._seconds * 1000
      });
    }

    const result = {
      posts,
      hasMore: posts.length >= 10
    }

    return result;
  } catch (error) {
    functions.logger.error(error);
  }
  
  throw new functions.https.HttpsError('internal');
});
