const uuid = require("uuid")
const experienceModel = require("../models/experienceModel")
const commonHelper = require("../helper/common")
const moment = require("moment")
const { uploadFile } = require("../config/googleDrive.config")

const experienceController = {
  getMyExperience: async (req, res) => {
    try {
      const userId = req.payload.id
      const result = await experienceModel.getMyExperience(userId)
      if (!result) {
        return res.json({
          Message: "Experience not found",
        })
      }
      const responseData = result.map((like) => {
        const startWork = moment(like.start_work)
        const endWork = moment(like.end_work)
        const duration = moment.duration(endWork.diff(startWork))
        let totalDuration = ""

        const years = duration.years()
        if (years > 0) {
          totalDuration += `${years} years`
        }

        const months = duration.months()
        if (months > 0) {
          if (totalDuration !== "") {
            totalDuration += ", "
          }
          totalDuration += `${months} months`
        }

        const days = duration.days()
        if (days > 0) {
          if (totalDuration !== "") {
            totalDuration += ", "
          }
          totalDuration += `${days} days`
        }

        return {
          id: like.id,
          name_company: like.name_company,
          name_position: like.name_position,
          start_work: startWork.format("DD MMMM YYYY"),
          end_work: endWork.format("DD MMMM YYYY"),
          image_experience_company: like.image_experience_company,
          job_description: like.job_description,
          duration_work: totalDuration,
        }
      })
      commonHelper.response(res, responseData, 200, "Get all data experience by user success")
    } catch (err) {
      res.json({ message: err.message })
    }
  },

  createExperience: async (req, res) => {
    const { name_company, name_position, start_work, end_work, job_description } = req.body
    const id = uuid.v4()

    // Extract the user ID and role from the decoded token
    const { id: userId, role } = req.payload

    // Check if the user is a worker
    if (role !== "worker") {
      return commonHelper.response(res, null, 403, "Only workers are allowed to add Experience")
    }

    // Check if start_work is before end_work
    if (moment(start_work).isAfter(moment(end_work))) {
      return commonHelper.response(res, null, 400, "Start work date can't be after end work date")
    }

    const image = req.files.image[0]
    const imageUrl = await uploadFile(image, "image/jpeg")

    const data = {
      id,
      name_company,
      name_position,
      start_work,
      end_work,
      image_experience_company: `${imageUrl.id}`,
      job_description,
      user_id: userId,
    }
    experienceModel
      .insertExperience(data)
      .then(() => {
        commonHelper.response(res, data, 201, "Experience has been added")
      })
      .catch((err) => res.send(err))
  },

  deleteExperience: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount, rows } = await experienceModel.findExperienceId(id)
      if (!rowCount) {
        return commonHelper.response(res, null, 404, "Experience not found")
      }

      // Extract the user ID from the decoded token
      const userId = req.payload.id

      // Check if the user ID of the decoded token matches the user ID of the Experience
      if (rows[0].user_id !== userId) {
        return commonHelper.response(res, null, 401, "You are not authorized to delete this Experience")
      }

      experienceModel
        .deleteExperience(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "Experience has been deleted")
        })
        .catch((err) => res.send(err))
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = experienceController
