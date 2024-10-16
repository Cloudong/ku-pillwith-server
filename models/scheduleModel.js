const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 회원 정보로 일정 조회
exports.findSchedulesById = async (user_id) => {
  const sql = `SELECT * FROM schedule WHERE user_id = ?`;
  const [rows] = await pool.execute(sql, [user_id]);
  return rows;
};

// 일정 등록
exports.createSchedule = async (user_id, type, pill_id, pill_imgurl, pill_dosage, pill_type) => {
  const sql = `INSERT INTO schedule (user_id, type, pill_id, pill_imgurl, pill_dosage, pill_type) VALUES (?, ?, ?, ?, ?, ?)`;
  await pool.execute(sql, [user_id, type, pill_id, pill_imgurl, pill_dosage, pill_type]);
};

// 일정 삭제
exports.deleteScheduleById = async (id) => {
  const sql = `DELETE FROM schedule WHERE id = ?`;
  const [result] = await pool.execute(sql, [id]);
  return result.affectedRows; // 삭제된 행의 수 반환. 반환값이 0일 경우 삭제 실패, 1일 경우 삭제 성공
};
