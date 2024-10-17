const express = require("express");
const pillController = require("../controllers/pillController");
const router = express.Router();

// open API DB 저장 라우트
/**
 * @swagger
 * /pills/fetch:
 *   get:
 *     summary: 의약품 정보 저장
 *     description: 새로운 의약품 정보를 데이터베이스에 저장합니다.
 *     responses:
 *       200:
 *         description: 의약품 정보 저장에 성공했습니다.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "의약품 정보 저장에 성공했습니다."
 *             savedPillNumber:
 *               type: integer
 *               example: 10
 *       500:
 *         description: 의약품 정보 저장 중 오류 발생
 */
router.get("/fetch", pillController.fetch);

router.get("/search", pillController.search);

module.exports = router;