import { ObjectId } from "mongoose";

interface UserInterface {
  _id: ObjectId;
  email: string;
  password: string;
}

export default UserInterface;
