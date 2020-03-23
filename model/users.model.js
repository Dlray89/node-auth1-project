const usersDB = require("../data/db.config")

module.exports = {
    find,
    findBy,
    findById,
    add,
}

function find(){
return usersDB("users").select("id"," username")
}

function findBy(filter){
    return usersDB("users").where(filter)
}
function findById(id){
    return usersDB("users")
    .where({ id })
    .first()
    
}
async function add(user){
    const [id] = await usersDB("users").insert(user, "id")

    return findById(id)
}