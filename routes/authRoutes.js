const express = require("express")
const router = express.Router()
const multer = require("multer")
const form = multer()
const userController = require("../controllers/userController")
const { verifyToken } = require("../middleware/auth")
const { validateLogin, validateRegisterWorker, validateRegisterCompany } = require("../middleware/validateUser")

router.post("/register-worker", form.none(), validateRegisterWorker, userController.registerUserWorker)
router.post("/register-company", form.none(), validateRegisterCompany, userController.registerUserCompany)
router.post("/login", form.none(), validateLogin, userController.loginUser)
router.post("/refresh-token", userController.refreshToken)
router.get("/profile", verifyToken, userController.profileUser)
router.put("/edit-worker", verifyToken, form.none(), userController.editProfileWorker)
router.put("/edit-company", verifyToken, form.none(), userController.editProfileCompany)

module.exports = router
