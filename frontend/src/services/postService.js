import firebase from '../firebase';

async function addPost(title, text) {
  try {
    const callable = firebase.functions.httpsCallable('addPost');
    const { data } = await callable({
      title,
      text
    });

    return data;
  } catch (error) {
    console.error(error)
  }
}

async function getPosts(lastDocId) {
  try {
    const callable = firebase.functions.httpsCallable('getPosts')
    const { data } = await callable({ lastDocId });

    return data;
  } catch (error) {
    console.error(error)
  }

  return [];
}

// TODO: There might be posts missing here if more than 10 created at the same time
function onNewPostCreated(callBack) {
  return firebase.db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(10)
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