const express = require('express');
const Message = require('../models/message')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/messages', auth ,async (req,res) => {
    const message = new Message({
        ...req.body,
        name: req.user.name,
        picture: req.user.picture,
        phone: req.user.phone,
        owner: req.user._id,
        email: req.user.email
    })
    try{
        await message.save()
        res.status(201).send(message)
    } catch(e){
        res.status(400).send(e)
    }
 })

router.get('/Allmessages' , async (req, res) => {
    try{
        const offers = await Message.find()
        res.send(offers)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/message/:id', async (req, res) => {
    const _id = req.params.id

    try{
       const message = await Message.findOne({ _id })

        if(!message){
            return res.status(404).send()
        }

        res.send(message)
    } catch(e){
        res.status(500).send()
    }
})

    router.delete('/messages/:id', async (req, res) => {
    try {
        const message = await Message.findOneAndDelete({ _id: req.params.id })

        if (!message) {
            return res.status(404).send()
        }
        res.send(message)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router