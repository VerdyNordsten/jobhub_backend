const Pool = require("../config/db")

const findSocialMediaByUserId = async (userId) => {
  const query = "SELECT * FROM social_media WHERE user_id = $1"
  const values = [userId]
  const result = await Pool.query(query, values)
  return result.rows[0]
}

const insertSocialMedia = (data) => {
  const { id, email, instagram, linkedin, github, user_id } = data
  const query = "INSERT INTO social_media(id, email, instagram, linkedin, github, user_id) VALUES($1, $2, $3, $4, $5, $6)"
  const values = [id, email, instagram, linkedin, github, user_id]
  return Pool.query(query, values)
}

const updateSocialMedia = (updateQuery, data) => {
  return Pool.query(`UPDATE social_media SET ${updateQuery} WHERE id=$${Object.keys(data).length}`, Object.values(data))
}

const deleteSocialMedia = (id) => {
  return Pool.query("DELETE FROM comment WHERE id=$1", [id])
}

const findSocialMediaId = (id) => {
  return Pool.query("SELECT * FROM social_media WHERE id = $1", [id])
}

module.exports = {
  findSocialMediaByUserId,
  insertSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
  findSocialMediaId,
}
