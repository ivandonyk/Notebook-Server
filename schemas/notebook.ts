import mongoose, { model, Schema } from "mongoose";
import NotebookInterface from "../interfaces/notebook";

const NotebookSchema = new Schema<NotebookInterface>({
  code: { type: String },
  name: { type: String },
  langId: { type: Number },
  isPrivate: { type: Boolean, default: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Notebook = model<NotebookInterface>("Notebook", NotebookSchema);

export default Notebook;
