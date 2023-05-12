const express = require("express")
const router = express.Router()
const userRouter = require("./authRoutes")
const profileRouter = require("./profileRoutes")
const talentRouter = require("./talentRoutes")

router.use("/user", userRouter)
router.use("/profile", profileRouter)
router.use("/talent", talentRouter)

module.exports = router
