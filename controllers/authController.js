import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import userModal from "../models/userModal.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, password, email, admin } = req.body;
    if (!name) res.send(`Name is required`);
    if (!password) res.send(`Password is required`);
    if (!email) res.send(`Email is required`);
    if (!admin) res.send(`Admin is required`);

    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      res.status(200).send({
        success: true,
        message: `Email already Registered`,
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModal({
      name,
      email,
      password: hashedPassword,
      admin,
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
    const { email, password, admin } = req.body;
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
        success: true,
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

export const testController = async (req, res) => {
  res.status(200).send({
    message: `middleware working`,
  });
};
