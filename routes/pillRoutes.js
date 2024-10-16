const express = require("express");
const pillController = require("../controllers/pillController");
const router = express.Router();

// open API DB 저장 라우트
router.get("/fetch", pillController.fetch);

module.exports = router;