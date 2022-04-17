const mysql = require('mysql2/promise')

class SqlClient {
  constructor () {
  // Creamos el pool de conexión y le pasamos el url de mi variable de entorno
    this.pool = mysql.createPool({ uri: process.env.DATABASE_URL })
    this.query = this.query.bind(this)
  }

  // Metodo para crear querys
  async query (sql, params) {
    const connection = await this.pool.getConnection()
    const response = await connection.execute(sql, params)
    // Se cierra la conexión
    connection.release()
    return response
  }
}

module.exports = SqlClient
