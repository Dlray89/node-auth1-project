const bcrypt = require("bcryptjs")
const router = require("express").Router();
const Users = require("../model/users.model")


router.post("/register", (req,res) => {
    const userInfo = req.body

    //this is where passwords will be hased
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS)

    userInfo.password = hash
    Users
    .add(userInfo)
    .then(users => {
        res.status(201).json(users)
    })
    .catch(error => {
        res.status(401).json({errorMessage: `${error}  Your registrations failed! Something went wrong`})
    })
})

router.post("/login", (req,res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
    .then(([user]) => {

        if (user && bcrypt.compareSync(password, user.password))

        {
            req.session.user = {
                id: user.id,
                username: user.username,
            }
            res.status(200).json({Welcome :  user.username})
        } else {
            res.status(401).json({message: "invaid credentials"})
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: `${error}`})
    })
})




module.exports = router