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
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Internal Server Error"
 */
router.get("/fetch", pillController.fetch);

/**
 * @swagger
 * /pills/search:
 *   get:
 *     summary: 의약품 검색
 *     description: 주어진 검색어를 포함하는 의약품 리스트를 조회합니다.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: 검색할 의약품 이름의 키워드입니다.
 *     responses:
 *       200:
 *         description: 검색 결과 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 의약품 ID
 *                   item_name:
 *                     type: string
 *                     description: 의약품 이름
 *                   product_type:
 *                     type: string
 *                     description: 의약품 효능
 *                   big_prdt_img_url:
 *                     type: string
 *                     description: 의약품 이미지 URL
 *       400:
 *         description: 유효하지 않은 검색어
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "유효하지 않은 검색어입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Internal Server Error"
 */
router.get("/search", pillController.search);

/**
 * @swagger
 * /pills/{id}:
 *   get:
 *     summary: 의약품 상세 정보 조회
 *     description: 주어진 ID에 해당하는 의약품의 상세 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 의약품의 고유 ID입니다.
 *     responses:
 *       200:
 *         description: 의약품 상세 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item_name:
 *                   type: string
 *                   description: 의약품 이름
 *                 item_ingr_name:
 *                   type: string
 *                   description: 의약품 성분 이름
 *                 product_type:
 *                   type: string
 *                   description: 의약품 효능
 *                 ee_doc_data:
 *                   type: string
 *                   description: 효능 효과
 *                 ud_doc_data:
 *                   type: string
 *                   description: 용법 용량
 *                 nb_doc_data:
 *                   type: string
 *                   description: 주의 사항
 *                 big_prdt_img_url:
 *                   type: string
 *                   description: 의약품 이미지 URL
 *       404:
 *         description: 의약품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "의약품을 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Internal Server Error"
 */
router.get("/:id", pillController.getPillById);

module.exports = router;