const bcryptjs = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        {
          username: "admin",
          password: bcryptjs.hashSync("1234", 13),
          department: "IT"
        },
        {
          username: "user1",
          password: bcryptjs.hashSync("5678", 13),
          department: "Sales"
        },
        {
          username: "user2",
          password: bcryptjs.hashSync("9101", 13),
          department: "Management"
        }
      ]);
    });
};