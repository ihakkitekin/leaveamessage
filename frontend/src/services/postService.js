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

async function getPosts() {
  try {
    const { data } = await firebase.functions.httpsCallable('getPosts').call();

    return data;
  } catch (error) {
    console.error(error)
  }

  return [];
}

async function onNewPostCreated(callBack) {
  return firebase.db
    .collection('posts')
    .orderBy('createdAt', 'desc')
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
            user: data.user,
            createdAt: data.createdAt
          }
        });

      if (addedPosts.length > 0) {
        callBack(addedPosts);
      }
    })
}

export default { addPost, getPosts, onNewPostCreated }