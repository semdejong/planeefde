const express = require("express");

const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");
const { paginatedResults } = require("./middleware/paginate");
const Lead = require("../models/lead");

const router = express.Router();

router.get("/progress/:id", (req, res) => {
  const id = req.params.id;

  Lead.findById(id)
    .then((lead) => {
      if (!lead) {
        return res.status(404).json({ message: "no lead has been found" });
      }
      res.status(200).send({ lastCompletedPage: lead.pageCompleted });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

router.post(
  "/getlead",
  authenticate,
  paginatedResults(Lead),
  authorize("admin", "leadgen.permissions.getLeads"),
  async (req, res) => {
    try {
      if (!req.authorized)
        return res.status(401).json({ message: "Unauthorized" });

      const leads = res.paginatedResults.results;

      res.status(200).json({
        amount: res.paginatedResults.amount,
        nextPage: res.paginatedResults.next,
        previousPage: res.paginatedResults.previous,
        leads: leads,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post("/", async (req, res) => {
  const ipAdress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const lead = new Lead({
    project: req.body.project,
    IPAdress: ipAdress,
  });

  const newLead = await lead.save();

  return res.status(200).json(newLead);
});

router.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({ message: "no lead has been found" });
    }

    if (req.body.pageCompleted) lead.pageCompleted = req.body.pageCompleted;

    if (req.body.data) {
      const data = req.body.data;

      for (const key in data) {
        if (!lead.data || !lead.data.hasOwnProperty(key)) {
          lead.data = { ...lead.data, [key]: data[key] };
          console.log(555, lead);
        }
      }
    }

    const newLead = await lead.save();

    console.log(newLead);

    return res.status(200).json({ message: "saved lead data" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
