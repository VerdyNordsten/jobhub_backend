/* eslint-disable camelcase */
const Pool = require("../config/db")

const selectAllTalent = async (limit, offset, searchParam, sortBY, sort) => {
  const query = `
    SELECT COUNT(*) OVER() as total_count, *
    FROM users
    WHERE LOWER(name) LIKE $1 AND role = 'worker'
    ORDER BY ${sortBY} ${sort}
    LIMIT $2 OFFSET $3;
  `
  const values = [`%${searchParam}%`, limit, offset]
  const result = await Pool.query(query, values)
  return result.rows
}

const selectProfileWorker = (id) => {
  return Pool.query(`SELECT * FROM profile_worker WHERE user_id=$1`, [id])
}

const selectProfileCompany = (id) => {
  return Pool.query(`SELECT * FROM profile_company WHERE user_id=$1`, [id])
}

const selectSocialMedia = (id) => {
  return Pool.query(`SELECT * FROM social_media WHERE user_id=$1`, [id])
}

const selectSkill = (id) => {
  return Pool.query(`SELECT * FROM skill WHERE user_id=$1`, [id])
}

const selectPortfolio = (id) => {
  return Pool.query(`SELECT * FROM portfolio WHERE user_id=$1`, [id])
}

const selectExperienceWork = (id) => {
  return Pool.query(`SELECT * FROM experience_work WHERE user_id=$1`, [id])
}

const selectTalent = (id) => {
  return Pool.query(`SELECT * FROM users WHERE id='${id}'`)
}

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM users")
}

const findId = (id) => {
  return Pool.query("SELECT * FROM users WHERE id = $1", [id])
}

const findName = (name) => {
  return Pool.query("SELECT * FROM users WHERE name = $1", [name])
}

module.exports = {
  selectAllTalent,
  selectProfileWorker,
  selectProfileCompany,
  selectSocialMedia,
  selectSkill,
  selectPortfolio,
  selectExperienceWork,
  selectTalent,
  countData,
  findId,
  findName,
}
