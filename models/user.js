const knex = require("knex")(require("../knexfile").development);

async function saveUser (user) {
    return await knex("user").insert({
        name: user.name,
        password: user.password,
    });
}

async function getUserByName(name) {
    return await knex("user").where({ name }).first(); // Retorna o primeiro usuário que corresponde ao nome
}


module.exports = {
    saveUser , getUserByName
};