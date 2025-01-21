// services/axiosService.js
const axios = require('axios');

// 예) .env 파일에 T_MONEY_API_KEY를 저장했다고 가정
// => process.env.T_MONEY_API_KEY
const TMONEY_API_KEY = process.env.T_MONEY_API_KEY;

// 공통 헤더나 기본 설정
const tmoneyInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'x-Gateway-APIKey': TMONEY_API_KEY,
  },
});

/**
 * GET 요청을 보낼 때, URL과 파라미터를 받아 재사용하는 함수
 * @param {string} url - 요청할 URL
 * @param {object} [params={}] - 쿼리 파라미터
 * @returns {Promise<object>} - 응답 데이터
 */
async function getRequest(url, params = {}) {
  console.log("TMONEY_API_KEY:", TMONEY_API_KEY)
  try {
    const response = await tmoneyInstance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET 요청 오류:', error.message);
    throw error;
  }
}

/**
 * POST 요청
 * @param {string} url - 호출할 API URL
 * @param {object} [body={}] - POST로 전송할 데이터
 * @returns {Promise<any>} - 응답 데이터
 */
async function postRequest(url, body = {}) {
    try {
      const response = await tmoneyInstance.post(url, body);
      return response.data;
    } catch (error) {
      console.error('[tmoneyApiService] POST 요청 오류:', error.message);
      throw error;
    }
}
  

module.exports = { 
    getRequest,
    postRequest,
};
