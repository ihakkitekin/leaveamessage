import firebase from '../firebase';

async function addPost(postTitle, postText) {
  console.log('postTitle:', postTitle)
  console.log('postText:', postText)
}

async function getPosts() {
  try {
    const snapshot = await firebase.db.collection("posts").get();

    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        text: doc.data().text,
        title: doc.data().title
      }
    });
  } catch (error) {
    console.error(error)
  }

  return [];
}

export default { addPost, getPosts }