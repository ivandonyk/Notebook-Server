import express from "express";
import bcrypt from "bcrypt";
import User from "../schemas/user";
import UserInterface from "../interfaces/user";

const bcryptRounds = 10;

const authRouter = express.Router();

authRouter.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user: UserInterface | null = await User.findOne({ email });

    if (!user || !password) return res.sendStatus(404);

    const isPasswordsMatching: boolean = await bcrypt.compare(
      password,
      user.password!
    );

    if (!isPasswordsMatching) return res.sendStatus(404);

    return res.status(200).send(user);
  } catch (e) {
    console.log("err", e);
    res.sendStatus(500);
  }
});

authRouter.post("/signUp", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, bcryptRounds);

    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(200).send(user);
  } catch (e) {
    console.log("err", e);
    res.sendStatus(500);
  }
});

export default authRouter;
