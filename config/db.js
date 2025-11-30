import mysql from 'mysql2/promise'

async function main() {
  const connection = await mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME
  })
  return connection
}

export { main }