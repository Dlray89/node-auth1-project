const express = require("express")

const router = express.Router()

const UsersDB = require("../model/users.model")

router.get("/", (res,req) => {
    UsersDB
    .find()
    .then(users => {
        res.json(users)
    })
    .catch(error => res.send(error))
})

module.exports = router