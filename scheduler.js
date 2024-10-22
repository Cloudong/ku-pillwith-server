const cron = require("node-cron");
const axios = require("axios");
const { backupData: backupDatabase } = require("./aws"); // 백업 함수 가져오기

// 스케쥴러 설정
// 매일 오전 00시에 API 호출
const startCronJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Running the fetch process...");
    try {
      const response = await axios.get("http://3.39.227.185:3001/pills/fetch"); // API 호출
      console.log("Fetch response:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
};

// 매일 오전 00시에 백업 수행
const backupDataAWS = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Running the backup process...");
    try {
      await backupDatabase();
      console.log("Scheduled backup completed successfully.");
    } catch (error) {
      console.error("Error during scheduled backup:", error);
    }
  });
};

// 수동으로 fetch 작업을 수행하는 함수
const manualFetch = async () => {
  console.log("Running the manual fetch process...");
  try {
    const response = await axios.get("http://3.39.227.185:3001/pills/fetch"); // API 호출
    console.log("Manual fetch response:", response.data);
  } catch (error) {
    console.error("Error during manual fetch:", error);
  }
};

module.exports = { startCronJob, manualFetch, backupDataAWS };
