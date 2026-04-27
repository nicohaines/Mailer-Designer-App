const express = require("express")
const router = express.Router()
const User = require("../models/template")

router.get('/getAllTemplates', async (req, res) => {
    try {
        const templates = await Template.getAllTemplates()
        res.send(templates)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router