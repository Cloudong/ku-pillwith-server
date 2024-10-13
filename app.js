require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.use("/auth", authRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
