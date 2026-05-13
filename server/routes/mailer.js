const express = require("express")
const router = express.Router()
const Mailer = require("../models/mailer")

router
.post('/getAllUserMailers', async (req, res) => {
    try {
        const mailers = await Mailer.getAllUserMailers(req.body.user)
        res.send(mailers)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})
.post('/createMailer', async (req, res) => {
    try {
        await Mailer.createMailer(req.body)
        res.send({message: "Mailer created successfully!"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})
.get('/getMailerById/:mailerId', async (req, res) => {
    try {
        const mailer = await Mailer.getMailerById(req.params.mailerId)
        res.send(mailer)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})
.put('/updateMailer/:mailerId', async (req, res) => {
    try {
        await Mailer.updateMailer(req.body)
        res.send({message: "Mailer updated successfully!"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})
.delete('/deleteMailer/:mailerId', async (req, res) => {
    try {
        await Mailer.deleteMailer(req.params.mailerId)
        res.send({message: "Mailer deleted successfully!"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router