const uuid = require("uuid")
const portfolioModel = require("../models/portfolioModel")
const commonHelper = require("../helper/common")
const { uploadFile } = require("../config/googleDrive.config")

const portfolioController = {
  getMyPortfolio: async (req, res) => {
    try {
      const userId = req.payload.id
      const result = await portfolioModel.getMyPortfolio(userId)
      if (!result) {
        return res.json({
          Message: "Portfolio not found",
        })
      }
      const responseData = result.map((like) => {
        return {
          id: like.id,
          name_portfolio: like.name_portfolio,
          link_repository: like.link_repository,
          type_portfolio: like.type_portfolio,
          image_portfolio: like.image_portfolio,
        }
      })
      commonHelper.response(res, responseData, 200, "Get all data portfolio by user success")
    } catch (err) {
      res.json({ message: err.message })
    }
  },

  createPortfolio: async (req, res) => {
      const { name_portfolio, link_repository, type_portfolio } = req.body
      const id = uuid.v4()

      // Extract the user ID and role from the decoded token
      const { id: userId, role } = req.payload

      // Check if the user is a worker
      if (role !== "worker") {
        return commonHelper.response(res, null, 403, "Only workers are allowed to add Portfolio")
      }

      // Check if the name portfolio already exists for the user
      const existingPortfolio = await portfolioModel.findPortfolioByUserIdAndName(userId, name_portfolio)
      if (existingPortfolio) {
        return commonHelper.response(res, null, 400, "Portfolio name already exists")
      }

      const image = req.files.image[0]
      const imageUrl = await uploadFile(image, "image/jpeg")

      const data = {
        id,
        name_portfolio,
        link_repository,
        type_portfolio,
        image_portfolio: imageUrl.id,
        user_id: userId,
      }
      portfolioModel
      .insertPortfolio(data)
      .then(() => {
        commonHelper.response(res, data, 201, "Portfolio has been added")
      })
      .catch((err) => res.send(err))
  },

  deletePortfolio: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount, rows } = await portfolioModel.findPortfolioId(id)
      if (!rowCount) {
        return commonHelper.response(res, null, 404, "Portfolio not found")
      }

      // Extract the user ID from the decoded token
      const userId = req.payload.id

      // Check if the user ID of the decoded token matches the user ID of the Portfolio
      if (rows[0].user_id !== userId) {
        return commonHelper.response(res, null, 401, "You are not authorized to delete this portfolio")
      }

      portfolioModel
        .deletePortfolio(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "Portfolio has been deleted")
        })
        .catch((err) => res.send(err))
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = portfolioController
