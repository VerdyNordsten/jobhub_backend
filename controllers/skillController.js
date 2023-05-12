const uuid = require("uuid")
const skillModel = require("../models/skillModel")
const commonHelper = require("../helper/common")

const skillController = {
  getMySkill: async (req, res) => {
    try {
      const userId = req.payload.id
      const result = await skillModel.getMySkill(userId)
      if (!result) {
        return res.json({
          Message: "Skill not found",
        })
      }
      const responseData = result.map((like) => {
        return {
          id: like.id,
          name_skill: like.name_skill,
        }
      })
      commonHelper.response(res, responseData, 200, "Get all data skill by user success")
    } catch (err) {
      res.json({ message: err.message })
    }
  },

  createSkill: async (req, res) => {
    try {
      const { name_skill } = req.body
      const id = uuid.v4()

      // Extract the user ID and role from the decoded token
      const { id: userId, role } = req.payload

      // Check if the user is a worker
      if (role !== "worker") {
        return commonHelper.response(res, null, 403, "Only workers are allowed to add skills")
      }

      // Check if the user has reached the maximum number of skills (10)
      const existingSkills = await skillModel.findSkillByUserId(userId)
      if (existingSkills.length >= 10) {
        return commonHelper.response(res, null, 400, "You can add a maximum of 10 skills")
      }

      // Check if the skill already exists for the user
      const existingSkill = await skillModel.findSkillByUserIdAndName(userId, name_skill)
      if (existingSkill) {
        return commonHelper.response(res, null, 400, "Skill already exists")
      }

      const data = {
        id,
        name_skill,
        user_id: userId,
      }
      const result = await skillModel.insertSkill(data)
      commonHelper.response(res, result.rows, 201, "Skill has been added")
    } catch (err) {
      res.json({ message: err.message })
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount, rows } = await skillModel.findSkillId(id)
      if (!rowCount) {
        return commonHelper.response(res, null, 404, "Skill not found")
      }

      // Extract the user ID from the decoded token
      const userId = req.payload.id

      // Check if the user ID of the decoded token matches the user ID of the skill
      if (rows[0].user_id !== userId) {
        return commonHelper.response(res, null, 401, "You are not authorized to delete this skill")
      }

      skillModel
        .deleteSkill(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "Skill has been deleted")
        })
        .catch((err) => res.send(err))
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = skillController
