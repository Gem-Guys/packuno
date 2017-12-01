const db = require('../models/index.js');

const Sequelize = require('sequelize');
const pg = require('pg');

db.sequelize.authenticate().then(() => {
  console.log('Success!');
}).catch((err) => {
  console.log(err);
});

// db.sequelize.sync({force:true});
//uncomment above to drop tables on npm run server or npm start scripts.
//It drops tables because sync() recreates the tables everytime the
//server is run. So to prevent dropping tables each time but you want tables
//to be initially created in the DB, uncomment the line above, run npm start/run server,
//then comment out the line above so the next time server/index.js is run, it doesn't
//drop your newly created tables.

const createUser = (email, firstName, lastName, googleId) => {

return db.User.findOrCreate({
 where:
      {
 email,
        first_name: firstName,
        last_name: lastName,
        googleId,
      },
  }).spread((user, create) => { user.get({ plain: true }); });
}

const findUser = (googleId) => {
  return db.User.findOne({ where: { googleId: googleId } })
    .then(user => user);
};

module.exports.createUser = createUser;
module.exports.findUser = findUser;



