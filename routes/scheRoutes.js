const express = require("express");
const scheController = require("../controllers/scheController");
const router = express.Router();

// 일정 목록 조회 라우팅
router.get("/schedules", scheController.getUserSchedules);

// 일정 생성 라우팅
router.post("/register", scheController.createSchedule);

// 일정 삭제 라우팅
router.delete("/:id", scheController.deleteSchedule);

module.exports = router;
