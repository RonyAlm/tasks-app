const sqlite = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite.Database(
  path.resolve(__dirname, '../database.db'),
  (err) => {
    if (err) {
      console.error(err)
    }

    console.log('Connected to database')

    const sql = `
      CREATE TABLE IF NOT EXISTS tasks (
        id CHAR(36) PRIMARY KEY NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        completed BOOLEAN NOT NULL DEFAULT 0,
        created_at VARCHAR(255)
      );
    `

    db.run(sql, (err) => {
      if (err) {
        console.error(err)
      }
    })
  }
)

module.exports = db
