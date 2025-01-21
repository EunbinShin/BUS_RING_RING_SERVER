const { upsertTerminalList } = require('./firebaseService')
const { getRequest } = require('./tmoneyApiService')
// services/loadInfoService.js

const axios = require('axios');

/**
 * 티머니 '배차리스트 기초코드 조회 API'를 호출하여 
 * 출·도착지 터미널 리스트(기초코드)를 가져옵니다.
 *
 * @param {string} inDate - 기초 데이터 변경일자 (기본값: '00000000000000')
 *   - 예: YYYYMMDDHHmmss 형식
 *   - API 문서에 따르면, 최초 호출 시 '00000000000000'을 사용
 *     이후 응답 받은 마지막 변경일시를 재사용할 수도 있음
 *
 * @returns {Promise<Object>} - API 응답 JSON 객체
 *
 * @example
 * // Usage:
 * try {
 *   const data = await fetchLoadInfo('20250101000000');
 *   console.log('기초코드 데이터:', data);
 * } catch (error) {
 *   console.error('API 호출 오류:', error);
 * }
 */
async function fetchLoadInfo(inDate = '00000000000000') {
  // 티머니 API 호출 URL (예시)
  const url = `https://apigw.tmoney.co.kr:5556/gateway/koLoadInfo/v1/load_info/${inDate}`;

  try {
    // 1) GET 요청
    const response = await getRequest(url);

    
    // 2) 응답 데이터
    const data = response.response;
    // 3) 응답 내 ter_list 추출
    const terList = data?.ter_list ?? [];
    if(terList.length > 0){
        console.error('terList 입력', terList);
        await upsertTerminalList(terList);
    }

    return data;
  } catch (error) {
    console.error('[fetchLoadInfo] 티머니 기초코드 조회 오류:', error.message);
    throw error;
  }
}

module.exports = { fetchLoadInfo };
