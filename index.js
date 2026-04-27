require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())

const userRoutes = require("./server/routes/user")
const mailerRoutes = require("./server/routes/mailer")
const templateRoutes = require("./server/routes/template")
app.use("/users", userRoutes)
app.use("/mailer", mailerRoutes)
app.use("/template", templateRoutes)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`))