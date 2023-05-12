const Pool = require("../config/db")

const findId = (userId) => {
  return Pool.query("SELECT * FROM users WHERE id = $1", [userId])
}

const findEmail = (email) => {
  return Pool.query("SELECT * FROM users WHERE email = $1", [email])
}

const insertUserWorker = async (data) => {
  return await Pool.query("INSERT INTO users (id, name, email, password, phone_number, role) VALUES ($1, $2, $3, $4, $5, $6)", [data.id, data.name, data.email, data.password, data.phone_number, data.role])
}

const insertUserCompany = async (data) => {
  return await Pool.query("INSERT INTO users (id, name, email, password, phone_number, company, position, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [data.id, data.name, data.email, data.password, data.phone_number, data.company, data.position, data.role])
}

const editProfileWorker = (name, password, phone_number, id) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: "UPDATE users SET name=$1, password=$2, phone_number=$3 WHERE id=$4",
      values: [name, password, phone_number, id],
    }
    Pool.query(query, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const editProfileCompany = (name, password, phone_number, company, position, id) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: "UPDATE users SET name=$1, password=$2, phone_number=$3, company=$4, position=$5 WHERE id=$6",
      values: [name, password, phone_number, company, position, id],
    }
    Pool.query(query, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}



module.exports = { findId, findEmail, insertUserWorker, insertUserCompany, editProfileWorker, editProfileCompany }
