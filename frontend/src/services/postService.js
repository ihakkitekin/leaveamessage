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

export default { addPost, getPosts }