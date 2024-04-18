const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('./path/to/your/serviceAccount.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://parsimple-3fd79.firebaseio.com'
});
