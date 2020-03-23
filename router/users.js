const express = require("express")

const router = express.Router()

const UsersDB = require("../model/users.model")

router.get("/", (res,req) => {
    UsersDB.find().then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({errorMessage: `${error}: Couldn't find user`})
   
})
})

module.exports = router