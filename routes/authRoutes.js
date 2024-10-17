const express = require("express");
const authController = require("../controllers/authController");
const swaggerCli = require("swagger-cli");
const router = express.Router();

// 회원가입 라우트

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원가입
 *     description: 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - password
 *               - name
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "testuser123"
 *               password:
 *                 type: string
 *                 example: "securePassword!123"
 *               name:
 *                 type: string
 *                 example: "홍길동"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Error registering user
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 사용자 ID와 비밀번호로 로그인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - password
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "testuser123"
 *               password:
 *                 type: string
 *                 example: "securePassword!123"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: string
 *                       example: "testuser123"
 *       401:
 *         description: 잘못된 자격 증명
 *       404:
 *         description: 사용자 찾을 수 없음
 *       500:
 *         description: 로그인 처리 중 오류 발생
 */
router.post("/login", authController.login);

//로그인 정보 세션 라우트
/**
 * @swagger
 * /auth/session:
 *   get:
 *     summary: 로그인 세션 정보 반환
 *     description: 현재 로그인된 사용자의 세션 정보를 반환합니다.
 *     responses:
 *       200:
 *         description: 세션 정보 반환 성공
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 user_id:
 *                   type: string
 *                   example: "testuser123"
 *       401:
 *         description: 로그인하지 않음
 */
router.get("/session", authController.session);

module.exports = router;
