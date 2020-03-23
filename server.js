const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")


const userRouter = require("./router/users")
const authRouter = require("./auth/auth.router")

const server = express()
server.use(helmet())
server.use(morgan("dev"))
server.use(express.json())
server.use(cors())
server.use("/api/users", userRouter)
server.use("/api/auth", authRouter)


server.get("/", (req,res) => {
    res.status(200).json({message: "Server is up and running"})
})
module.exports = server