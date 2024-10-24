const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// 회원가입 라우트

/**
 * @swagger
 * /api/auth/register:
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
 * /api/auth/login:
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
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Error logging in
 */
router.post("/login", authController.login);

//로그인 정보 세션 라우트
/**
 * @swagger
 * /api/auth/session:
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
 *         description: Not logged in
 */
router.get("/session", authController.session);

/**
 * @swagger
 * /api/auth/update-name:
 *   post:
 *     summary: 유저 이름 업데이트
 *     description: 로그인한 유저의 이름을 업데이트 합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_name:
 *                 type: string
 *                 description: The new name for the user.
 *                 example: "NewUserName"
 *     responses:
 *       200:
 *         description: Name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Name updated successfully"
 *                 new_name:
 *                   type: string
 *                   example: "NewUserName"
 *       401:
 *         description: Not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not logged in"
 *       500:
 *         description: Error updating nickname
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating nickname"
 */
router.post("/update-name", authController.updateName);

/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     summary: 유저 로그아웃
 *     description: 세션을 종료시키며 현재 로그인한 유저를 로그아웃합니다.
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *       401:
 *         description: Not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not logged in"
 *       500:
 *         description: Error logging out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error logging out"
 */
router.delete("/logout", authController.logout);

module.exports = router;
