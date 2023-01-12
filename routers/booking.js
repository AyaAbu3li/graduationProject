const express = require('express');
const Booking = require('../models/booking')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/booking', auth ,async (req,res) => {
    const booking = new Booking({
        ...req.body,
        owner: req.user._id,
        PersonName: req.user.name, 
        phoneNumber: req.user.phone,
        PersonPic: req.user.picture,
    })
    try{
        await booking.save()
        res.status(201).send(booking)
    } catch(e){
        res.status(400).send(e)
    }
 })

 router.get('/booking' , auth, async (req, res) => {

    try{
        const offers = await Booking.find({ owner: req.user._id })
        // owner: req.user._id
        res.send(offers)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/Allbooking' , async (req, res) => {
    try{
        const offers = await Booking.find()
        res.send(offers)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/booking/:id' , auth, async (req, res) => {
    const _id = req.params.id

    try{
       const booking = await Booking.findOne({ _id, owner: req.user._id })

        if(!booking){
            return res.status(404).send()
        }

        res.send(booking)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/booking/:id' , async (req, res) => {
    const _id = req.params.id

    try{
       const booking = await Booking.findOne({ _id })

        if(!booking){
            return res.status(404).send()
        }

        res.send(booking)
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/booking/:id' , async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const booking = await Booking.findOne({ _id: req.params.id})

        if(!booking) {
        return res.status(404).send()
        }

        updates.forEach((update) => booking[update] = req.body[update])  
        await booking.save()
        res.send(booking)
    } catch (e) { 
        res.status(400).send(e)
    }
    })

    router.delete('/booking/:id' , async (req, res) => {
    try {
        const booking = await Booking.findOneAndDelete({ _id: req.params.id })

        if (!booking) {
            return res.status(404).send()
        }
        res.send(booking)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router