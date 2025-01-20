const schedule = require('node-schedule');
const { fetchLoadInfo } = require('./loadInfoService');
//const { sendPushNotification } = require('./notificationService');
const { checkSeatAvailability } = require('../utils/checkSeatAvailability');

let previousSeatData = {};

async function checkSeats() {
  const routes = [
    { departure: '서울', arrival: '부산', date: '2025-01-20' },
  ];

  for (const route of routes) {
    try {
      const seatData = await getSeatStatus(route.departure, route.arrival, route.date);
      if (checkSeatAvailability(previousSeatData, route, seatData)) {
        sendPushNotification(route, seatData.availableSeats);
      }
      previousSeatData[`${route.departure}-${route.arrival}-${route.date}`] = seatData;
    } catch (error) {
      console.error(`Error checking seats for ${route.departure} -> ${route.arrival}:`, error.message);
    }
  }
}

/**
 * "일 단위 기초코드 조회" 스케줄링 함수
 * 매일 새벽 3시에 실행 (예: 0 3 * * *) 
 */
function startDailyLoadInfoPolling() {
  // cron 표현식: 초 분 시 일 월 요일
  //const rule = '0 3 * * *'; // 매일 3시 0분 0초에 실행
  const rule = '0 40 16 * * *';
  schedule.scheduleJob(rule, async () => {
    console.log(`[${new Date().toISOString()}] [LoadInfoPolling] 기초코드 조회 시작`);

    try {
      // inDate를 '00000000000000'로 넣거나, 실제 변경일자(YYYYMMDDHHmmss)로 넣을 수 있음
      const data = await fetchLoadInfo('00000000000000');
      // TODO: 가져온 data를 DB에 저장하거나, 추가 처리를 수행
      console.log('[LoadInfoPolling] 기초코드 조회 완료:', data);
    } catch (error) {
      console.error('[LoadInfoPolling] 기초코드 조회 실패:', error.message);
    }
  });

  console.log('일 단위 LoadInfo Polling이 설정되었습니다. (매일 새벽 3시)');
}


module.exports = { checkSeats, startDailyLoadInfoPolling };
