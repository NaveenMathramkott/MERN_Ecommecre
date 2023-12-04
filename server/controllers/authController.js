import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import userModal from "../models/userModal.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, password, email, admin, answer } = req.body;

    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: `Email already Registered`,
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModal({
      name,
      email,
      password: hashedPassword,
      admin,
      answer,
    }).save();
    res.status(200).send({
      success: true,
      message: `User has been registered successfully`,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in Registration`,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: `Invalid Email or Password`,
      });
    }
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: `Email not Registered`,
      });
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(200).send({
        success: false,
        message: `Invalid Password`,
      });
    }
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "4d",
    });
    res.status(200).send({
      success: true,
      message: `User login successfully`,
      user: {
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in Login`,
    });
  }
};

export const forgotPassWordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(404).send({
        success: false,
        message: `Email is required`,
      });
    }
    if (!answer) {
      return res.status(404).send({
        success: false,
        message: `Answer is required`,
      });
    }
    if (!newPassword) {
      return res.status(404).send({
        success: false,
        message: `New Password is required`,
      });
    }

    const user = await userModal.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: `Wrong email or answer`,
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModal.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: `Password reset successfully`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Something went wrong`,
    });
  }
};

export const testController = async (req, res) => {
  res.status(200).send({
    message: `middleware working`,
  });
};
