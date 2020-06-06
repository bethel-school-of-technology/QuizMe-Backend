module.exports =  {
  "username": process.env.db_username,
  "password": process.env.db_password,
  "database": process.env.db_database,
  "host": process.env.db_host,
  "dialect": process.env.db_dialect,
  "define": {"timestamps": false}
}
