import JWT from "jsonwebtoken";
import userModal from "../models/userModal.js";

// middleWare for sigIn user
export const requireSignIn = async (req, res, next) => {
  try {
    const decryptToken = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );

    req.user = decryptToken;
    next();
  } catch (error) {
    res.status(404).send({
      message: `Token issue`,
    });
  }
};

// middleWare for check the give user is admin or not admin
export const checkAdmin = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.user.id);
    if (!user.admin) {
      res.status(404).send({
        success: false,
        message: `UnAuthorized access`,
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: `Admin authorization issue`,
    });
  }
};
