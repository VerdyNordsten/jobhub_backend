const uuid = require("uuid")
const socialMediaModel = require("../models/socialMediaModel")
const commonHelper = require("../helper/common")

const socialMediaController = {
  getSocialMedia: async (req, res) => {
    try {
      const userId = req.payload.id
      const result = await socialMediaModel.findSocialMediaByUserId(userId)
      if (!result) {
        return res.json({
          Message: "Social Media not found",
        })
      }
      const responseData = {
        email: result.email,
        instagram: result.instagram,
        linkedin: result.linkedin,
        github: result.github,
      }
      commonHelper.response(res, responseData, 200, "Get data social media")
    } catch (err) {
      res.json({ message: err.message })
    }
  },

  createSocialMedia: async (req, res) => {
    try {
      const { email, instagram, linkedin, github } = req.body
      const id = uuid.v4()

      // Extract the user ID from the decoded token
      const userId = req.payload.id

      // Check if the user already has a worker profile
      const existingSocialMedia = await socialMediaModel.findSocialMediaByUserId(userId)
      if (existingSocialMedia) {
        return commonHelper.response(res, null, 400, "You already have a Social Media")
      }

      const data = {
        id,
        email,
        instagram,
        linkedin,
        github,
        user_id: userId,
      }
      const result = await socialMediaModel.insertSocialMedia(data)
      commonHelper.response(res, result.rows, 201, "Social Media has been created")
    } catch (err) {
      res.json({ message: err.message })
    }
  },

  updateSocialMedia: async (req, res) => {
    try {
      // Extract the user ID from the decoded token
      const userId = req.payload.id

      const { email, instagram, linkedin, github } = req.body
      const profileResult = await socialMediaModel.findSocialMediaByUserId(userId)
      if (!profileResult) {
        console.log("Social Media not found")
        return res.json({
          message: "Social Media not found",
        })
      }
      const profile = profileResult

      let data = {}
      let updateQuery = ""
      let message = "No data updated"
      if (email !== undefined && email !== profile.email) {
        data.email = email || null
        updateQuery += `${updateQuery ? ", " : ""}email=$${Object.keys(data).length}`
        message = "Social Media updated succesfully"
      }
      if (instagram !== undefined && instagram !== profile.instagram) {
        data.instagram = instagram || null
        updateQuery += `${updateQuery ? ", " : ""}instagram=$${Object.keys(data).length}`
        message = "Social Media updated succesfully"
      }
      if (linkedin !== undefined && linkedin !== profile.linkedin) {
        data.linkedin = linkedin || null
        updateQuery += `${updateQuery ? ", " : ""}linkedin=$${Object.keys(data).length}`
        message = "Social Media updated succesfully"
      }
      if (github !== undefined && github !== profile.github) {
        data.github = github || null
        updateQuery += `${updateQuery ? ", " : ""}github=$${Object.keys(data).length}`
        message = "Social Media updated succesfully"
      }

      if (!updateQuery) {
        return res.json({
          message: message,
        })
      }

      data.id = profile.id
      socialMediaModel
        .updateSocialMedia(updateQuery, data)
        .then(() => {
          socialMediaModel
            .findSocialMediaByUserId(userId)
            .then((profileResult) => {
              commonHelper.response(res, profileResult, 200, message)
            })
            .catch((err) => res.send(err))
        })
        .catch((err) => res.send(err))
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = socialMediaController
