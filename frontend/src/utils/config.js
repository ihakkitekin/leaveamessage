import firebase from '../firebase';

const remoteConfig = firebase.remoteConfig;

async function init() {
  remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
  };

  remoteConfig.defaultConfig = {
    'POST_PAGINATION_COUNT': 10,
  };

  await remoteConfig.fetchAndActivate();
  await remoteConfig.ensureInitialized();
}

export { init }
export default remoteConfig;