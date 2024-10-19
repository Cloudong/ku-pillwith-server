const cron = require('node-cron');
const axios = require('axios');

// 스케쥴러 설정
// 매일 오전 00시에 API 호출
const startCronJob = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running the fetch process...');
        try {
            const response = await axios.get('http://localhost:3001/pills/fetch'); // API 호출
            console.log('Fetch response:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
};

module.exports = { startCronJob };