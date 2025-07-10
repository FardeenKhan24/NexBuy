const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const sendLoginEmail = require('../utils/sendLoginEmail'); 
const sendRegisterEmail = require('../utils/sendRegisterEmail');

exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (name.length < 3) return res.status(400).json({ error: "Username must be at least 3 characters" });
  if (!email.includes('@')) return res.status(400).json({ error: "Invalid email format" });
  if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });
  if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    const token = generateToken(newUser._id);

    await sendRegisterEmail(newUser.name, newUser.email);

    res.status(201).json({
      message: "User registered successfully",
      newUser,
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);

    await sendLoginEmail(user.name, user.email);

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};




