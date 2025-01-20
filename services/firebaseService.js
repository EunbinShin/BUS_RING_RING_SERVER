// services/rtdbService.js
const { rtdb } = require('../config/firebaseConfig');

/**
 * 단일 터미널을 Upsert
 * @param {object} ter
 * @param {string} ter.TER_COD
 * @param {string} ter.TER_NAM
 * ... (필요한 필드)
 */
async function upsertTerminal(ter) {
  if (!ter.TER_COD) throw new Error('TER_COD(키) 없음');

  // 예: terminals/TER_COD 경로 사용
  const ref = rtdb.ref(`terminals/${ter.TER_COD}`);

  // update() → 없으면 생성, 있으면 특정 필드만 업데이트(Upsert)
  const dataToUpdate = {
    ter_nam: ter.TER_NAM ?? '',
    ter_adr: ter.TER_ADR ?? '',
    ter_lat: ter.TER_LAT ? parseFloat(ter.TER_LAT) : null,
    ter_lon: ter.TER_LON ? parseFloat(ter.TER_LON) : null,
    updated_at: Date.now(),
  };

  await ref.update(dataToUpdate);
  console.log(`[upsertTerminal] ${ter.TER_COD} 업서트 완료`);
}

/**
 * 여러 터미널 정보를 Upsert
 * @param {Array} terList
 */
async function upsertTerminalList(terList = []) {
  for (const ter of terList) {
    await upsertTerminal(ter);
  }
  console.log(`[upsertTerminalList] 총 ${terList.length}개 터미널 Upsert 완료`);
}

module.exports = {
  upsertTerminal,
  upsertTerminalList,
};