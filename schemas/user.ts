import { model, Schema } from "mongoose";
import UserInterface from "../interfaces/user";

const UserSchema = new Schema<UserInterface>({
  email: { type: String },
  password: { type: String },
});

const User = model<UserInterface>("User", UserSchema);

export default User;
