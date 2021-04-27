const router = require("express").Router();
const Log = require("../models/log");
const validate = require("../middleware/validateSession");

router.get("/test", validate, (req, res) => {
  console.log(req.user);
  return res.send("Log Controller Test");
});

// CREATE NEW LOG
router.post("/", validate, (req, res) => {
  Log.create({
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner_id: req.user.id,
  })
    .then((log) => res.status(200).json({ log }))
    .catch((err) =>
      res.status(500).json({ message: "Log Creation Failed", errror: err })
    );
});

// GET ALL LOGS FOR USER
router.get("/", validate, (req, res) => {
  Log.findAll({ where: { owner_id: req.user.id } })
    .then((logs) =>
      res.status(200).json({
        logs,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: "Error retrieving logs", err })
    );
});

// GET INDIVIDUAL LOGS FOR USER
router.get("/:id", validate, (req, res) => {
  Log.findOne({ where: { owner_id: req.user.id, id: req.params.id } })
    .then((log) =>
      res.status(200).json({
        log,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: "Error retrieving log", err })
    );
});

// UPDATE A LOG
router.put("/:id", validate, (req, res) => {
  Log.update(req.body, { where: { owner_id: req.user.id, id: req.params.id } })
    .then((updated) =>
      res.status(200).json({
        message: `succcessfully updated log ${req.params.id}`,
        updated,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: "Log update failed", err })
    );
});

// DELETE A LOG
router.delete("/:id", validate, (req, res) => {
  Log.destroy({ where: { owner_id: req.user.id, id: req.params.id } })
    .then((deleted) =>
      res.status(200).json({
        message: `Log #${req.params.id} has been deleted`,
        deleted,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: "Unable to delete log",
        error: err,
      })
    );
});

module.exports = router;
