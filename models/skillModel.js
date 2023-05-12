const Pool = require("../config/db")

const findSkillByUserId = async (userId) => {
  const query = {
    text: "SELECT * FROM skill WHERE user_id = $1",
    values: [userId],
  }
  const { rows } = await Pool.query(query)
  return rows
}

const findSkillByUserIdAndName = async (userId, skillName) => {
  const query = {
    text: "SELECT * FROM skill WHERE user_id = $1 AND LOWER(name_skill) = LOWER($2)",
    values: [userId, skillName],
  }
  const { rows } = await Pool.query(query)
  return rows[0]
}

const getMySkill = async (id) => {
  const query = {
    text: `
      SELECT *
      FROM skill 
      WHERE user_id = $1
    `,
    values: [id],
  }
  const result = await Pool.query(query)
  return result.rows
}

const insertSkill = (data) => {
  const { id, name_skill, user_id } = data
  const query = "INSERT INTO skill(id, name_skill, user_id) VALUES($1, $2, $3)"
  const values = [id, name_skill, user_id]
  return Pool.query(query, values)
}

const deleteSkill = (id) => {
  return Pool.query("DELETE FROM skill WHERE id=$1", [id])
}

const findSkillId = (id) => {
  return Pool.query("SELECT * FROM skill WHERE id = $1", [id])
}

module.exports = {
  findSkillByUserId,
  findSkillByUserIdAndName,
  getMySkill,
  insertSkill,
  deleteSkill,
  findSkillId,
}
