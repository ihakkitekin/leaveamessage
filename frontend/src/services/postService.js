import firebase from '../firebase';

async function addPost(postTitle, postText) {
  console.log('postTitle:', postTitle)
  console.log('postText:', postText)
}

async function getPosts() {
  try {
    firebase.functions.useFunctionsEmulator('http://localhost:5001')
    const posts = await firebase.functions.httpsCallable('getPosts').call();

    console.log(posts)
  } catch (error) {
    console.error(error)
  }

  return [];
}

export default { addPost, getPosts }