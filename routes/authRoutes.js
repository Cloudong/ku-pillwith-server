const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// 회원가입 라우트
router.post("/register", authController.register);

// 로그인 라우트
router.post("/login", authController.login);

//로그인 정보 세션 라우트
router.get("/session", authController.session);

module.exports = router;
