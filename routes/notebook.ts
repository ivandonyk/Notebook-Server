import express from "express";
import Notebook from "../schemas/notebook";

const noteBookRouter = express.Router();

noteBookRouter.get("/:userId", async (req, res) => {
  try {
    const notebooks = await Notebook.find({ owner: req.params.userId });
    res.status(200).send(notebooks);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

noteBookRouter.get("/one/:notebookId", async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.notebookId);
    res.status(200).send(notebook);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

noteBookRouter.get("/public", async (req, res) => {
  try {
    const notebooks = await Notebook.find({ isPrivate: false });
    res.status(200).send(notebooks);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

noteBookRouter.post("/", async (req, res) => {
  try {
    const notebook = new Notebook(req.body);
    await notebook.save();

    res.status(200).send(notebook);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

noteBookRouter.patch("/:notebookId", async (req, res) => {
  try {
    const updatedNoteBook = await Notebook.findByIdAndUpdate(
      req.body._id,
      req.body
    );
    res.status(200).send(updatedNoteBook);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

noteBookRouter.delete("/:notebookId", async (req, res) => {
  try {
    await Notebook.findByIdAndDelete(req.body._id);
    res.sendStatus(203);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default noteBookRouter;
