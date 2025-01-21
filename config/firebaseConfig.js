// firebaseAdmin.js (서버 전용)
// -- "firebase/app" 대신 "firebase-admin" 사용
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bus-ring-ring-default-rtdb.firebaseio.com/',
});

// Realtime DB 인스턴스
const rtdb = admin.database();

module.exports = { admin, rtdb };
