const express = require("express");
const scheController = require("../controllers/scheController");
const router = express.Router();

// 일정 목록 조회 라우팅
/**
 * @swagger
 * /schedule/schedules:
 *   get:
 *     summary: 사용자의 복용 일정 목록 조회
 *     description: 로그인된 사용자의 복용 일정을 조회합니다.
 *     responses:
 *       200:
 *         description: 일정 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       type:
 *                         type: string
 *                         example: "아침"
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *                       pill_id:
 *                         type: integer
 *                         example: 1
 *                       pill_imgurl:
 *                         type: string
 *                         example: "http://example.com/pill-image.jpg"
 *                       pill_dosage:
 *                         type: string
 *                         example: "1정"
 *                       pill_type:
 *                         type: string
 *                         example: "[03310]혈액대용제"
 *       401:
 *         description: 인증되지 않음 (Unauthorized)
 *       404:
 *         description: 일정이 없음 (No schedules found)
 *       500:
 *         description: 일정 조회 중 오류 발생 (Error fetching schedules)
 */
router.get("/schedules", scheController.getUserSchedules);

// 일정 생성 라우팅
/**
 * @swagger
 * /schedule/register:
 *   post:
 *     summary: 복용 일정 등록
 *     description: 사용자의 복용 일정을 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - type
 *               - pill_id
 *               - pill_imgurl
 *               - pill_dosage
 *               - pill_type
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               type:
 *                 type: string
 *                 example: "아침"
 *               pill_id:
 *                  type: integer
 *                  example: 1
 *               pill_imgurl:
 *                 type: string
 *                 example: "http://example.com/pill-image.jpg"
 *               pill_dosage:
 *                 type: string
 *                 example: "1정"
 *               pill_type:
 *                 type: string
 *                 example: "[03310]혈액대용제"
 *     responses:
 *       201:
 *         description: 일정 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule added successfully"
 *       400:
 *         description: 필수 필드 누락 (Missing required fields)
 *       500:
 *         description: 일정 등록 실패 (Failed to add schedule)
 */
router.post("/register", scheController.createSchedule);

// 일정 삭제 라우팅
/**
 * @swagger
 * /schedule/{id}:
 *   delete:
 *     summary: 복용 일정 삭제
 *     description: 지정된 ID에 해당하는 복용 일정을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 일정의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 일정 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule deleted successfully"
 *       400:
 *         description: 일정 ID 누락 (Missing schedule ID)
 *       404:
 *         description: 해당 일정이 없음 (Schedule not found")
 *       500:
 *         description: 일정 삭제 실패 (Failed to delete schedule)
 */
router.delete("/:id", scheController.deleteSchedule);

module.exports = router;
