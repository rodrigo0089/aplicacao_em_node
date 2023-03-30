const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const patch = require("path")

async function sqliteConnection(){
  const database = await sqlite.open({
    filename: patch.resolve(__dirname,"..", "database.db"),
    driver: sqlite3.Database
  });

  return database;

}

module.exports = sqliteConnection