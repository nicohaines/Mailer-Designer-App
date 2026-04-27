const express = require("express")
const router = express.Router()
const User = require("../models/mailer")

router.get('/getAllMailers', async (req, res) => {
    try {
        const mailers = await Mailer.getAllMailers()
        res.send(mailers)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router