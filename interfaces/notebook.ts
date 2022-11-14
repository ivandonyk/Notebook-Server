import { ObjectId } from "mongoose";

interface NotebookInterface {
  _id: string;
  name: string;
  code: string;
  langId: number;
  isPrivate: boolean;
  owner: ObjectId;
}

export default NotebookInterface;
