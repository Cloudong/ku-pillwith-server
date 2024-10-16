const { Sequelize } = require('sequelize');
require('dotenv').config(); // .env 파일 로드

// 환경 변수에서 데이터베이스 연결 정보 가져오기
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // 사용할 데이터베이스 종류
});

module.exports = sequelize;
