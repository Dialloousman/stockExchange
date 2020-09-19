const { Pool } = require("pg");
const connectionString =
    "postgres://oiysbnzt:ROVrW9vVyDTcVouwtVIhrm6JSqfqiYKw@lallah.db.elephantsql.com:5432/oiysbnzt";
    
const pool = new Pool({
	connectionString: connectionString,
});

module.exports = {
    query: function (text, params, callback) {
        console.log('executed query', text)
        return pool.query(text, params, callback)
    }
}
