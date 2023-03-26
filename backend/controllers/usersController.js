import User from "../model/userModel.js";
import brcypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userCheckLogin = await User.findOne({ username });
    if (!userCheckLogin) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const isPasswordValid = await brcypt.compare(
      password,
      userCheckLogin.password
    );
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    // delete userCheckLogin.password;
    userCheckLogin.password = null;
    // console.log(userCheckLogin);
    return res.send({ status: true, userCheckLogin });
  } catch (ex) {
    next(ex);
  }
};
