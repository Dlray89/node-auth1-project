const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const session = require("express-session")


const userRouter = require("./router/users")
const authRouter = require("./auth/auth.router")
const restricted = require("./auth/restricted-middlewear")

const server = express()

const sessionConfig = {
    name: 'DapCookie',
    secret: "Secret and safe cookie",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized:true,
}


server.use(helmet())
server.use(morgan("dev"))
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))


server.use("/api/users", restricted, userRouter)
server.use("/api/auth", authRouter)


server.get("/", (req,res) => {
    res.status(200).json({message: "Server is up and running"})
})
module.exports = server