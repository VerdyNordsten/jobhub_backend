const profileModel = require("../models/profileModel")
const commonHelper = require("../helper/common")
const uuid = require("uuid")
const moment = require("moment")
const { uploadFile } = require("../config/googleDrive.config")

const profileController = {
  getProfileWorker: async (req, res) => {
    try {
      const userId = req.payload.id
      const result = await profileModel.findProfileWorkerByUserId(userId)
      if (!result) {
        return res.json({
          Message: "Data profile worker not found",
        })
      }
      const responseData = {
        id: result.id,
        job_title: result.job_title,
        location: result.location,
        work_type: result.work_type,
        worker_description: result.worker_description,
        image_profile_worker: result.image_profile_worker,
      }
      commonHelper.response(res, responseData, 200, "Get data profile worker succesfull")
    } catch (err) {
      res.json({ message: err.message })
    }
  },

  createProfileWorker: async (req, res) => {
    const { job_title, location, work_type, worker_description } = req.body
    const id = uuid.v4()

    const image = req.files.image[0]
    const imageUrl = await uploadFile(image, "image/jpeg")

    // Extract the user ID and role from the decoded token
    const { id: userId, role } = req.payload

    // Check if the user's role is "worker"
    if (role !== "worker") {
      return commonHelper.response(res, null, 401, "You are not authorized to create a worker profile")
    }

    // Check if the user already has a worker profile
    const existingProfile = await profileModel.findProfileWorkerByUserId(userId)
    if (existingProfile) {
      return commonHelper.response(res, null, 400, "You already have a worker profile")
    }

    const data = {
      id,
      job_title,
      location,
      work_type,
      worker_description,
      image_profile_worker: imageUrl.id,
      user_id: userId,
    }

    profileModel
      .insertProfileWorker(data)
      .then(() => {
        commonHelper.response(res, null, 201, "Profile worker has been created")
      })
      .catch((err) => res.send(err))
  },

  createProfileCompany: async (req, res) => {
    const { location, company_description } = req.body
    const id = uuid.v4()

    const image = req.files.image[0]
    const imageUrl = await uploadFile(image, "image/jpeg")

    // Extract the user ID and role from the decoded token
    const { id: userId, role } = req.payload

    // Check if the user's role is "company"
    if (role !== "company") {
      return commonHelper.response(res, null, 401, "You are not authorized to create a company profile")
    }

    // Check if the user already has a company profile
    const existingProfile = await profileModel.findProfileCompanyByUserId(userId)
    if (existingProfile) {
      return commonHelper.response(res, null, 400, "You already have a company profile")
    }

    const data = {
      id,
      location,
      company_description,
      image_profile_company: imageUrl.id,
      user_id: userId,
    }

    profileModel
      .insertProfileCompany(data)
      .then(() => {
        commonHelper.response(res, null, 201, "Profile company has been created")
      })
      .catch((err) => res.send(err))
  },

  updateProfileWorker: async (req, res) => {
    try {
      const { job_title, location, work_type, worker_description } = req.body

      // Extract the user ID from the decoded token
      const userId = req.payload.id

      const profileResult = await profileModel.findProfileWorkerByUserId(userId)
      if (!profileResult) {
        console.log("Profile not found")
        return res.json({
          message: "Profile not found",
        })
      }
      const profile = profileResult

      let data = {}
      let updateQuery = ""
      let message = "Profile Worker updated successfully"
      const image_profile_worker = req.files.image?.[0] // Use optional chaining operator to check if req.files.image_profile_worker is defined

      if (job_title) {
        data.job_title = job_title
        updateQuery += `${updateQuery ? ", " : ""}job_title=$${Object.keys(data).length}`
      }
      if (location) {
        data.location = location
        updateQuery += `${updateQuery ? ", " : ""}location=$${Object.keys(data).length}`
      }
      if (work_type) {
        data.work_type = work_type
        updateQuery += `${updateQuery ? ", " : ""}work_type=$${Object.keys(data).length}`
      }
      if (worker_description) {
        data.worker_description = worker_description
        updateQuery += `${updateQuery ? ", " : ""}worker_description=$${Object.keys(data).length}`
      }
      if (image_profile_worker) {
        const imageUrl = await uploadFile(image_profile_worker, "image/jpeg")
        data.image_profile_worker = imageUrl.id
        updateQuery += `${updateQuery ? ", " : ""}image_profile_worker=$${Object.keys(data).length}`
      }

      data.id = profile.id
      profileModel
        .updateProfileWorker(updateQuery, data)
        .then(() => {
          profileModel
            .findProfileWorkerByUserId(userId)
            .then((profileResult) => {
              profileResult.edited_at = moment(profileResult.edited_at).format("DD MMMM YYYY HH:mm")
              commonHelper.response(res, profileResult, 200, message)
            })
            .catch((err) => res.send(err))
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log(error)
    }
  },

  updateProfileCompany: async (req, res) => {
    try {
      const { location, company_description } = req.body

      // Extract the user ID from the decoded token
      const userId = req.payload.id

      // Check if the profile exists and if the user who created it is the same as the authenticated user
      const profileResult = await profileModel.findProfileCompanyByUserId(userId)
      if (!profileResult) {
        console.log("Profile not found")
        return res.json({
          message: "Profile not found",
        })
      }
      const profile = profileResult

      let data = {}
      let updateQuery = ""
      let message = "Profile Company updated successfully"
      // const image_profile_company = req.files.image_profile_company?.[0] // Use optional chaining operator to check if req.files.image_profile_company is defined

      if (location) {
        data.location = location
        updateQuery += `${updateQuery ? ", " : ""}location=$${Object.keys(data).length}`
      }
      if (company_description) {
        data.company_description = company_description
        updateQuery += `${updateQuery ? ", " : ""}company_description=$${Object.keys(data).length}`
      }
      // if (image_profile_company) {
      //   const imageUrl = await uploadFile(image_profile_company, "image/jpeg")
      //   data.image_profile_company = `https://drive.google.com/uc?id=${imageUrl.id}`
      //   updateQuery += `${updateQuery ? ", " : ""}image_profile_company=$${Object.keys(data).length}`
      // }

      data.id = profile.id
      profileModel
        .updateProfileCompany(updateQuery, data)
        .then(() => {
          profileModel
            .findProfileCompanyByUserId(userId)
            .then((profileResult) => {
              profileResult.edited_at = moment(profileResult.edited_at).format("DD MMMM YYYY HH:mm")
              commonHelper.response(res, profileResult, 200, message)
            })
            .catch((err) => res.send(err))
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = profileController
