const admin = require("firebase-admin");
const serviceAccount = require("./admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://leaveamessage-a4475.firebaseio.com"
});

const { getPosts } = require('./getPosts');
const { addPost } = require('./addPost');

exports.getPosts = getPosts;
exports.addPost = addPost;
