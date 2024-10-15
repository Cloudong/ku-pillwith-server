require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const pillRoutes = require("./routes/pillRoutes");
const app = express();

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.use("/auth", authRoutes);
app.use('/pills', pillRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
