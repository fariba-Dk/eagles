const { Pool } = require('pg/lib');
const db = new Pool({
    connectionString: process.env.DB_URI
  });

  module.exports = db;
