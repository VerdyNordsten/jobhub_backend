const express = require("express")
const router = express.Router()
const talentController = require("../controllers/talentController")

router.get("/", talentController.getAllTalent)
router.get("/:id", talentController.getDetailTalent)

module.exports = router
