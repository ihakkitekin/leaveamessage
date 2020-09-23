import firebase from '../firebase';
import config from '../utils/config';
import { message } from 'antd';

async function addPost(title, text) {
  try {
    const callable = firebase.functions.httpsCallable('addPost');
    const { data } = await callable({
      title,
      text
    });

    return data;
  } catch (error) {
    message.error(error.message);
  }
}

async function getPosts(lastDocId) {
  try {
    const callable = firebase.functions.httpsCallable('getPosts')
    const { data } = await callable({ lastDocId });

    return data;
  } catch (error) {
    message.error(error.message);
  }

  return [];
}

// TODO: There might be posts missing here if more than 10 created at the same time
function onNewPostCreated(callBack) {
  return firebase.db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(config.getNumber('POST_PAGINATION_COUNT'))
    .onSnapshot(async (snapshot) => {
      const changedDocs = snapshot
        .docChanges()
        .filter(function (change) {
          return change.type === "added"
        });

      const addedPosts = []

      for (let i = 0; i < changedDocs.length; i++) {
        const change = changedDocs[i];

        const data = change.doc.data();
        const userInfoDoc = await data.userInfo.get();
        const userInfo = userInfoDoc.data();

        addedPosts.push({
          id: change.doc.id,
          title: data.title,
          text: data.text,
          userNickname: userInfo.nickname,
          userAvatarId: userInfo.avatarId,
          createdAt: data.createdAt.seconds * 1000
        });
      }


      if (addedPosts.length > 0) {
        callBack(addedPosts);
      }
    })
}

export default { addPost, getPosts, onNewPostCreated }