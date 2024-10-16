const scheduleModel = require("../models/scheduleModel");

// 회원의 복용 일정 조회
exports.getUserSchedules = async (req, res) => {
  req.session.user; // 이거 없으면 쿠키가 안담아짐;; 왜이러냐
  // 로그인된 사용자의 ID를 세션에서 가져옴
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // 데이터베이스에서 해당 사용자의 일정 목록 조회
    const schedules = await scheduleModel.findSchedulesById(req.session.user.id);

    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ message: "No schedules found" });
    }

    res.status(200).json({ schedules: schedules });
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};

// 복용 일정 등록
exports.createSchedule = async (req, res) => {
  // req.session.user; // 이거 없으면 쿠키가 안담아짐;; 왜이러냐

  const { user_id, type, pill_id, pill_imgurl, pill_dosage, pill_type } = req.body;

  if (!user_id || !type || !pill_id || !pill_imgurl || !pill_dosage || !pill_type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // 일정 등록 (DB에 추가)
    await scheduleModel.createSchedule(user_id, type, pill_id, pill_imgurl, pill_dosage, pill_type);

    res.status(201).json({ message: "Schedule added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add schedule", error });
  }
};

// 복용 일정 삭제
exports.deleteSchedule = async (req, res) => {
  const { id } = req.params; // URL에서 id 추출

  if (!id) {
    return res.status(400).json({ message: "Missing schedule ID" });
  }

  try {
    // 일정 삭제 수행
    const deletedRows = await scheduleModel.deleteScheduleById(id);

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete schedule", error });
  }
};

// 일정에 의약품 추가
