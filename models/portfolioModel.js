const Pool = require("../config/db")

const findPortfolioByUserId = async (userId) => {
  const query = {
    text: "SELECT * FROM portfolio WHERE user_id = $1",
    values: [userId],
  }
  const { rows } = await Pool.query(query)
  return rows
}

const findPortfolioByUserIdAndName = async (userId, portfolioName) => {
  const query = {
    text: "SELECT * FROM portfolio WHERE user_id = $1 AND LOWER(name_portfolio) = LOWER($2)",
    values: [userId, portfolioName],
  }
  const { rows } = await Pool.query(query)
  return rows[0]
}

const getMyPortfolio = async (id) => {
  const query = {
    text: `
      SELECT *
      FROM portfolio 
      WHERE user_id = $1
    `,
    values: [id],
  }
  const result = await Pool.query(query)
  return result.rows
}
const insertPortfolio = (data) => {
  const { id, name_portfolio, link_repository, type_portfolio, image_portfolio, user_id } = data
  const query = "INSERT INTO portfolio(id, name_portfolio, link_repository, type_portfolio, image_portfolio, user_id) VALUES($1, $2, $3, $4, $5, $6)"
  const values = [id, name_portfolio, link_repository, type_portfolio, image_portfolio, user_id]
  return Pool.query(query, values)
}

const deletePortfolio = (id) => {
  return Pool.query("DELETE FROM portfolio WHERE id=$1", [id])
}

const findPortfolioId = (id) => {
  return Pool.query("SELECT * FROM portfolio WHERE id = $1", [id])
}

module.exports = {
  findPortfolioByUserId,
  findPortfolioByUserIdAndName,
  getMyPortfolio,
  insertPortfolio,
  deletePortfolio,
  findPortfolioId,
}
