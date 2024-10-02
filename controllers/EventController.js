const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const { title, date, type } = req.body;

    const event = await Event.create({
      title,
      date,
      type,
    });

    res.status(201).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error, could not create event" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error, could not fetch events" });
  }
};

const UpdateEvent = async (req, res) => {
  const { id } = req.params;

  const { title, date, type } = req.body;

  try {
    const event = await Event.findById({ _id: id });

    if (event) {
      event.title = title || event.title;
      event.date = date || event.date;
      event.type = type || event.type;
      await event.save();
    } else {
      res.status(400).json({ message: "Error,cannot update Event" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error, could not update event" });
  }
};

const DeleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await Event.deleteOne({ _id: id });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error, could not delete event" });
  }
};

module.exports = { createEvent, getAllEvents, UpdateEvent, DeleteEvent };
