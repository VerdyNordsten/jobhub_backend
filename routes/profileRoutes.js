const express = require("express");
const router = express.Router();
const multer = require("multer");
const form = multer();
const profileController = require("../controllers/profileController");
const socialMediaController = require("../controllers/socialMediaController");
const skillController = require("../controllers/skillController");
const portfolioController = require("../controllers/portfolioController");
const experienceController = require("../controllers/experienceController");
// const { validateCreateRecipe, validateUpdateRecipe } = require('../middleware/validateRecipe')
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/validateUpload");

// Saat Google drive aktif ubah form.none menjadi upload.fields([{ name: "image", maxCount: 1 }]) (yang mengandung image(profile,portofolio,experience))

// Add Profile
router.get("/worker", verifyToken, profileController.getProfileWorker);
// router.get("/company", verifyToken, profileController.getSocialMedia)
router.post("/worker", verifyToken, upload.fields([{ name: "image", maxCount: 1 }]), profileController.createProfileWorker);
router.post("/company", verifyToken, upload.fields([{ name: "image", maxCount: 1 }]), profileController.createProfileCompany);
router.put("/edit-worker", verifyToken, upload.fields([{ name: "image", maxCount: 1 }]), profileController.updateProfileWorker);
router.put("/edit-company", verifyToken, upload.fields([{ name: "image", maxCount: 1 }]), profileController.updateProfileCompany);

// Add Social Media
router.get("/social-media", verifyToken, socialMediaController.getSocialMedia);
router.post("/social-media", verifyToken, form.none(), socialMediaController.createSocialMedia);
router.put("/social-media", verifyToken, form.none(), socialMediaController.updateSocialMedia);

// Add Skill
router.get("/skill", verifyToken, skillController.getMySkill);
router.post("/skill", verifyToken, form.none(), skillController.createSkill);
router.delete("/skill/:id", verifyToken, form.none(), skillController.deleteSkill);

// Add Portofolio
router.get("/portfolio", verifyToken, portfolioController.getMyPortfolio);
router.post("/portfolio", verifyToken, upload.fields([{ name: "image", maxCount: 1 }]), portfolioController.createPortfolio);
router.delete("/portfolio/:id", verifyToken, form.none(), portfolioController.deletePortfolio);

// Add Experience Work
router.get("/experience", verifyToken, experienceController.getMyExperience);
router.post("/experience", verifyToken, upload.fields([{ name: "image", maxCount: 1 }]), experienceController.createExperience);
router.delete("/experience/:id", verifyToken, form.none(), experienceController.deleteExperience);

module.exports = router;
