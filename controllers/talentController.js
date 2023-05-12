const talentModel = require("../models/talentModel")
const commonHelper = require("../helper/common")
const moment = require("moment")
// const moment = require("moment")

const talentController = {
  getAllTalent: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 4
      const offset = (page - 1) * limit
      const sortBY = req.query.sortBY || "id"
      const sort = req.query.sort || "ASC"
      const searchParam = req.query.search ? req.query.search.toLowerCase() : ""

      const result = await talentModel.selectAllTalent(limit, offset, searchParam, sortBY, sort)
      const totalData = result.length > 0 ? result[0].total_count : 0
      const data = result.filter((talent) => talent.role !== "company")

      const promises = data.map(async (row) => {
        const profileWorker = await talentModel.selectProfileWorker(row.id)
        if (profileWorker.rowCount === 0) {
          return {
            id: row.id,
            name: row.name,
            email: row.email,
            phone_number: row.phone_number,
            detail_worker: "Profile worker not yet added",
            skill: "Skill not yet added",
          }
        }
        const detail_worker = [
          {
            job_title: profileWorker.rows[0].job_title,
            location: profileWorker.rows[0].location,
            work_type: profileWorker.rows[0].work_type,
            worker_description: profileWorker.rows[0].worker_description,
            image_profile_worker: profileWorker.rows[0].image_profile_worker,
          },
        ]
        const skill = await talentModel.selectSkill(row.id)
        if (skill.rowCount === 0) {
          return {
            id: row.id,
            name: row.name,
            email: row.email,
            phone_number: row.phone_number,
            detail_worker,
            skill: "Skill not yet added",
          }
        }
        const skillArr = skill.rows.map((skill) => {
          return {
            name_skill: skill.name_skill,
          }
        })
        return {
          id: row.id,
          name: row.name,
          email: row.email,
          phone_number: row.phone_number,
          detail_worker,
          skill: skillArr,
        }
      })

      const talentData = await Promise.all(promises)

      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage: Math.ceil(totalData / limit),
      }

      commonHelper.response(res, talentData, 200, "Get all talent data success", pagination)
    } catch (err) {
      console.log(err)
    }
  },

  getDetailTalent: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await talentModel.findId(id)

      if (!rowCount) {
        return res.json({
          message: "Data not found",
        })
      }

      const talent = await talentModel.selectTalent(id)
      // Profile Worker
      const profileWorker = await talentModel.selectProfileWorker(id)
      const detailWorker =
        profileWorker.rowCount > 0
          ? {
              job_title: profileWorker.rows[0].job_title,
              location: profileWorker.rows[0].location,
              work_type: profileWorker.rows[0].work_type,
              worker_description: profileWorker.rows[0].worker_description,
              image_profile_worker: profileWorker.rows[0].image_profile_worker,
            }
          : ["Profile worker not yet added"]
      // Detail Social Media
      const socialMedia = await talentModel.selectSocialMedia(id)
      const detailSocialMedia =
        socialMedia.rowCount > 0
          ? {
              email: socialMedia.rows[0].email,
              instagram: socialMedia.rows[0].instagram,
              linkedin: socialMedia.rows[0].linkedin,
              github: socialMedia.rows[0].github,
            }
          : ["Social Media not yet added"]
      // Detail Skill
      const skill = await talentModel.selectSkill(id)
      const detailSkill =
        skill.rowCount > 0
          ? skill.rows.map((skill) => {
              return {
                name_skill: skill.name_skill,
              }
            })
          : ["Skill worker not yet added"]
      // Detail Portfolio
      const portfolio = await talentModel.selectPortfolio(id)
      const detailPortfolio =
        portfolio.rowCount > 0
          ? portfolio.rows.map((portfolio) => {
              return {
                id: portfolio.id,
                name_portfolio: portfolio.name_portfolio,
                link_repository: portfolio.link_repository,
                type_portfolio: portfolio.type_portfolio,
                image_portfolio: portfolio.image_portfolio,
              }
            })
          : ["Portfolio worker not yet added"]
      // Detail Experience Work
      const experienceWork = await talentModel.selectExperienceWork(id)
      const detailExperienceWork =
        experienceWork.rowCount > 0
          ? experienceWork.rows.map((experienceWork) => {
              const startWork = moment(experienceWork.start_work)
              const endWork = moment(experienceWork.end_work)
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
                id: experienceWork.id,
                name_company: experienceWork.name_company,
                name_position: experienceWork.name_position,
                start_work: startWork.format("DD MMMM YYYY"),
                end_work: endWork.format("DD MMMM YYYY"),
                duration_work: totalDuration,
                image_experience_company: experienceWork.image_experience_company,
                job_description: experienceWork.job_description,
              }
            })
          : ["Experience worker not yet added"]

      const data = {
        id: talent.rows[0].id,
        name: talent.rows[0].name,
        email: talent.rows[0].email,
        phone_number: talent.rows[0].phone_number,
        detail_worker: detailWorker,
        detail_social_media: detailSocialMedia,
        detail_skill: detailSkill,
        detail_portfolio: detailPortfolio,
        detail_experience_work: detailExperienceWork,
      }

      commonHelper.response(res, data, 200, "Get detail talent success")
    } catch (err) {
      res.json({ message: err.message })
    }
  },
}

module.exports = talentController
