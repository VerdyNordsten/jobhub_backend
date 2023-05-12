/* eslint-disable camelcase */
const Pool = require("../config/db")

const insertProfileWorker = (data) => {
  const { id, job_title, location, work_type, worker_description, image_profile_worker, user_id } = data
  const query = "INSERT INTO profile_worker(id, job_title, location, work_type, worker_description, image_profile_worker, user_id) VALUES($1, $2, $3, $4, $5, $6, $7)"
  const values = [id, job_title, location, work_type, worker_description, image_profile_worker, user_id]
  return Pool.query(query, values)
}

const insertProfileCompany = (data) => {
  const { id, location, company_description, image_profile_company, user_id } = data
  const query = "INSERT INTO profile_company(id, location, company_description, image_profile_company, user_id) VALUES($1, $2, $3, $4, $5)"
  const values = [id, location, company_description, image_profile_company, user_id]
  return Pool.query(query, values)
}

const updateProfileWorker = (updateQuery, data) => {
  updateQuery += `${updateQuery ? ", " : ""}edited_at=CURRENT_TIMESTAMP`
  return Pool.query(`UPDATE profile_worker SET ${updateQuery} WHERE id=$${Object.keys(data).length}`, Object.values(data))
}

const updateProfileCompany = (updateQuery, data) => {
  updateQuery += `${updateQuery ? ", " : ""}edited_at=CURRENT_TIMESTAMP`
  return Pool.query(`UPDATE profile_company SET ${updateQuery} WHERE id=$${Object.keys(data).length}`, Object.values(data))
}

const findProfileWorkerByUserId = async (userId) => {
  const query = "SELECT * FROM profile_worker WHERE user_id = $1"
  const values = [userId]
  const result = await Pool.query(query, values)
  return result.rows[0]
}

const findProfileCompanyByUserId = async (userId) => {
  const query = "SELECT * FROM profile_company WHERE user_id = $1"
  const values = [userId]
  const result = await Pool.query(query, values)
  return result.rows[0]
}

module.exports = {
  insertProfileWorker,
  insertProfileCompany,
  updateProfileWorker,
  updateProfileCompany,
  findProfileWorkerByUserId,
  findProfileCompanyByUserId,
}
