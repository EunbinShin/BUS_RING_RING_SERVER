function getCurrentTimestamp() {
    const now = new Date();
    
    const year = now.getFullYear();           // 2023
    const month = String(now.getMonth() + 1).padStart(2, '0');  // 01 ~ 12
    const day = String(now.getDate()).padStart(2, '0');         // 01 ~ 31
    const hour = String(now.getHours()).padStart(2, '0');       // 00 ~ 23
    const minute = String(now.getMinutes()).padStart(2, '0');   // 00 ~ 59
    const second = String(now.getSeconds()).padStart(2, '0');   // 00 ~ 59
  
    // 조합: YYYYMMDDHHmmss
    return `${year}${month}${day}${hour}${minute}${second}`;
  }
  

module.exports = { 
    getCurrentTimestamp,
};
