const SchoolNotice = require("../models/Notice");

const CreateNotice = async (req, res) => {
  const { title, description, image, shownotice } = req.body;
  try {
    const notice = await SchoolNotice.create({
      title,
      description,
      image,
      shownotice,
    });
    if (notice) {
      res.status(201).json({ message: "Notice created" });
    }
  } catch (err) {
    res.status(400).json({ message: "Notice not created" });
  }
};

const getNotice = async (req, res) => {
  try {
    const notices = await SchoolNotice.find({});
    res.json(notices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const DeleteNotice = async (req, res) => {
  const { id } = req.params;

  try {
    const notice = await SchoolNotice.findById(id);

    if (notice) {
      await notice.deleteOne();
      res.status(200).json({ message: "Notice deleted" });
    }
  } catch (err) {
    res.status(400).json({ message: "Notice not deleted" });
  }
};

const setShowNotice = async (req, res) => {
  const { id } = req.params;

  try {
    const notice = await SchoolNotice.findById(id);

    if (notice) {
      notice.shownotice = req.body.shownotice;
      await notice.save();
      res.status(200).json({ message: "Notice shown" });
    }
  } catch (err) {
    res.status(400).json({ message: "Notice not shown" });
  }
};

module.exports = { CreateNotice, getNotice, DeleteNotice, setShowNotice };
