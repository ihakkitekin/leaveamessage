

async function addPost(postTitle, postText) {
  console.log('postTitle:', postTitle)
  console.log('postText:', postText)
}

async function getPosts() {
  return [
    {
      title: 'Post Title 1',
      text: 'Post Text 1',
    },
    {
      title: 'Post Title 2',
      text: 'Post Text 2',
    },
    {
      title: 'Post Title 3',
      text: 'Post Text 3',
    }
  ]
}

export default { addPost, getPosts }