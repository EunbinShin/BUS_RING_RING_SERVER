const express = require('express');
const { checkSeats, startDailyLoadInfoPolling } = require('./services/pollingService');
//const busRoute = require('./routes/busRoute');

const app = express();
app.use(express.json());
// app.use('/api', busRoute); // '/api/check-seat'로 티머니 좌석 정보를 확인할 수 있음

// 1분마다 좌석 상태 확인
// setInterval(checkSeats, 60000);

// 하루주기로 배차리스트 기초코드 조회
startDailyLoadInfoPolling();

const PORT = 3000;
app.listen(
    PORT, 
    () => console.log(`Server running on http://localhost:${PORT}`)
);
