const AWS = require("aws-sdk");
const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

const s3 = new AWS.S3();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function backupData() {
  try {
    const query = util.promisify(db.query).bind(db);
    const users = await query("SELECT * FROM User");
    const medicines = await query("SELECT * FROM pills");
    const schedules = await query("SELECT * FROM Schedule");
    const session = await query("SELECT * FROM Sessions");

    const backupData = {
      users,
      medicines,
      schedules,
      session,
    };

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `backup-${Date.now()}.json`,
      Body: JSON.stringify(backupData),
      ContentType: "application/json",
    };

    await s3.putObject(params).promise();
    console.log("Backup successful:", params.Key);
  } catch (error) {
    console.error("Error backing up data:", error);
  } finally {
    db.end();
  }
}

// 내보내기
module.exports = { backupData };
