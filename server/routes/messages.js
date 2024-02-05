const Messages = require("../models/messageModel");
const router = require("express").Router();

router.post("/addmsg/", async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
});
router.post("/getmsg/", async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const TimeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    };
    const DateOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    };
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        realTime: msg.createdAt.toLocaleTimeString([], TimeOptions),
        realDate: msg.createdAt.toLocaleDateString('en-IN', DateOptions),
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
