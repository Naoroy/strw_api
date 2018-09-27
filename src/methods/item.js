const db_connection = require('./db')

const createPatchQuery = (id, params) => {
  let sql = []
  for (props in params) {
    if (params[props]) {
      props == 'name' ?
        sql.push(`${props} = "${params[props]}"`) :
        sql.push(`${props} = ${params[props]}`)
    }
  }
  return `UPDATE item SET ${sql.join(', ')} WHERE id = ${id}`
}
const checkItem = (obj) => {
  if (typeof obj !== 'object') { return false }
  const nameIsString = typeof obj.name === 'String'
  const priceIsNumber = typeof obj.price === 'Number'
  const stockIsNumber = typeof obj.stock === 'Number'
  if (nameIsString && priceIsNumber && stockIsNumber) {
    return true
  }
}

const item = {
  get(callback) {
    const sql = 'SELECT * FROM item'
    db_connection.query(sql, (error , result) => {
      if (error) { throw error }
      callback(result)
    })
  },
  post(data, callback) {
    if (checkItem(data)) { return callback('Invalid parameters!') }
    const { name, price, stock } = data
    const sql = `INSERT INTO item (name, price, stock)
    VALUES ("${name}", ${price}, ${stock})`
    db_connection.query(sql, (error, result) => {
      if (error) { throw error }
      callback(result)
    })
  },
  patch(data, id, callback) {
    const { name, price, stock } = data
    const sql = createPatchQuery(id, {name, price, stock})
    console.log(sql);
    db_connection.query(sql, (error, result) => {
      if (error) { throw error }
      callback(result)
    })
  },
  del(id, callback) {
    const sql = `DELETE FROM item WHERE id = ${id}`
    db_connection.query(sql, (error, result) => {
      if (error) { throw error }
      callback()
    })
  },
}

module.exports = item
