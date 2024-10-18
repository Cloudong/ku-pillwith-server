const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// 회원가입 처리
exports.register = async (req, res) => {
  const { user_id, password, name } = req.body;

  // 비밀번호 해시
  const hashedPassword = await bcrypt.hash(password, 10);

  // 회원 생성
  try {
    await userModel.createUser(user_id, hashedPassword, name);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// 로그인 처리
exports.login = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const user = await userModel.findUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 로그인 성공 시 세션에 사용자 정보 저장
    req.session.user = { id: user.id, name: user.name, user_id: user.user_id };

    res.status(200).json({ message: "Login successful", user: user });

    // 이 코드는 스케쥴이 잘 들어오나 확인하기 위함임
    // const schedules = await scheduleModel.findSchedulesById(user.id);
    // res.json({ message: "Welcome", schedule: schedules, user: user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// 세션 정보 반환
exports.session = async (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
};
