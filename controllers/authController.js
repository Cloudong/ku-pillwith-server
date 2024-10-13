const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// 회원가입 처리
exports.register = async (req, res) => {
  const { id, name, password } = req.body;

  // 비밀번호 해시
  const hashedPassword = await bcrypt.hash(password, 10);

  // 회원 생성
  try {
    await userModel.createUser(id, name, hashedPassword);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// 로그인 처리
exports.login = async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await userModel.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: `Welcome, ${user.name}!` });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
