const Pool = require("../config/db")

const findExperienceByUserId = async (userId) => {
  const query = {
    text: "SELECT * FROM experience_work WHERE user_id = $1",
    values: [userId],
  }
  const { rows } = await Pool.query(query)
  return rows
}

const getMyExperience = async (id) => {
  const query = {
    text: `
      SELECT *
      FROM experience_work 
      WHERE user_id = $1
    `,
    values: [id],
  }
  const result = await Pool.query(query)
  return result.rows
}

const insertExperience = (data) => {
  const { id, name_company, name_position, start_work, end_work, image_experience_company, job_description, user_id } = data
  const query = "INSERT INTO experience_work(id, name_company, name_position, start_work, end_work, image_experience_company, job_description, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)"
  const values = [id, name_company, name_position, start_work, end_work, image_experience_company, job_description, user_id]
  return Pool.query(query, values)
}

const deleteExperience = (id) => {
  return Pool.query("DELETE FROM experience_work WHERE id=$1", [id])
}

const findExperienceId = (id) => {
  return Pool.query("SELECT * FROM experience_work WHERE id = $1", [id])
}

module.exports = {
  findExperienceByUserId,
  getMyExperience,
  insertExperience,
  deleteExperience,
  findExperienceId,
}
