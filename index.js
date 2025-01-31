require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const cors = require("cors")
const path = require("path")
const models = require("./models/models")

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        models.initStatuses()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()