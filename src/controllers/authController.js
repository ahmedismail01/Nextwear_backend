const authService = require("../services/authService");
const {santizeUser} = require("../dto/userDto");

const login = async (req, res) => {
  const body = req.body;

  // authenticate user using auth service
  const user = await authService.login(body.email, body.password);

  if (user.error) {
    return res.status(401).json({ success: false, message: user.error });
  }

  // generate token
  const payload = { id: user._id, email: user.email, role: user.role };
  console.log(payload)
  const token = await authService.generateToken(payload);

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  // sanitize user object before sending response
  const sanitizedUser = santizeUser(user);

  res.json({ success: true, user: sanitizedUser, token });
};

const register = async (req, res) => {
  const body = req.body;

  const user = await authService.register(body);
  if (user.error) {
    return res.status(400).json({ success: false, message: user.error });
  }

  // generate token
  const payload = { id: user._id, email: user.email, role: user.role };
  const token = await authService.generateToken(payload);

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  // sanitize user object before sending response
  const sanitizedUser = santizeUser(user);

  res.json({ success: true, user: sanitizedUser, token });
};

module.exports = { login, register };
