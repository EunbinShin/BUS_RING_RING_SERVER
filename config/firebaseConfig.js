// config/firebase.js
const admin = require('firebase-admin');
require('dotenv').config(); // .env에 GOOGLE_APPLICATION_CREDENTIALS 등 설정 가능

// 서비스 계정 키 JSON 경로를 .env에서 가져오거나 직접 require(...) 할 수도 있음.
// 예) export GOOGLE_APPLICATION_CREDENTIALS="./service-account-key.json"

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // ↑ GOOGLE_APPLICATION_CREDENTIALS 환경변수를 자동 인식
  // 혹은 admin.credential.cert(require('../serviceAccount.json'))
  // Realtime Database를 쓰려면 databaseURL 설정 필요
  databaseURL: 'https://<your-project-id>.firebaseio.com',
});

const rtdb = admin.database();

module.exports = { admin, rtdb };
