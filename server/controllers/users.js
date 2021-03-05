import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const formData = req.body;
    const user = await User.findOne({ email: formData.email });

    if (user)
      return res.status(409).json({
        message: "User with this email already exists!",
        statusCode: 409,
      });

    const result = await User.create(formData);

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    console.log(token)

    res.status(200).json({
        message: "User created successfully",
        result,
        token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signIn = async (req, res) => {
  try {
    const formData = req.body;
    const user = await User.findOne({ email: formData.email });

    if (!user) return res.status(404).json({ message: "User doesn't exists" });

    const isPasswordsMatching = await bcrypt.compare(
      formData.password,
      user.password
    );

    if (!isPasswordsMatching)
      return res.status(409).json({ message: "Passwords don't match" });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    console.log(token)
    res.status(200).json({
      token,
      message: "User logged in successfully",
      result: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
