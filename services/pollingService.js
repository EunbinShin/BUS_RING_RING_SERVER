const { getSeatStatus } = require('./tmoneyApiService');
const { sendPushNotification } = require('./notificationService');
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

module.exports = { checkSeats };
