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
    .onSnapshot((snapshot) => {
      const addedPosts = snapshot
        .docChanges()
        .filter(function (change) {
          return change.type === "added"
        })
        .map(change => {
          const data = change.doc.data();

          return {
            id: change.doc.id,
            title: data.title,
            text: data.text,
            userNickname: data.userNickname,
            userAvatarId: data.userAvatarId,
            createdAt: data.createdAt
          }
        });

      if (addedPosts.length > 0) {
        callBack(addedPosts);
      }
    })
}

export default { addPost, getPosts, onNewPostCreated }