const express = require('express');
const Offer = require('../models/offer')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/offers', auth ,async (req,res) => {
    const offer = new Offer({
        ...req.body,
        salonname: req.user.name,
        picture: req.user.picture,
        owner: req.user._id,
        salonEmail: req.user.email
    })
    try{
        await offer.save()
        res.status(201).send(offer)
    } catch(e){
        res.status(400).send(e)
    }
 })

 router.get('/offers' , auth, async (req, res) => {
    
    try{
        const offers = await Offer.find({ owner: req.user._id })
        res.send(offers)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/Alloffers' , async (req, res) => {
    try{
        const offers = await Offer.find()
        res.send(offers)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/offers/:id' , auth, async (req, res) => {
    const _id = req.params.id

    try{
       const offer = await Offer.findOne({ _id, owner: req.user._id })

        if(!offer){
            return res.status(404).send()
        }

        res.send(offer)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/offer/:id' , async (req, res) => {
    const _id = req.params.id

    try{
       const offer = await Offer.findOne({ _id })

        if(!offer){
            return res.status(404).send()
        }
        res.send(offer)
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/offers/:id' , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [' name' , 'price' , ' services' ]

    try {
        const offer = await Offer.findOne({ _id: req.params.id})

        if(!offer) {
        return res.status(404).send()
        }

        updates.forEach((update) => offer[update] = req.body[update])  
        await offer.save()
        res.send(offer)
    } catch (e) { 
        res.status(400).send(e)
    }
    })

    router.delete('/offers/:id' , async (req, res) => {
    try {
        const offer = await Offer.findOneAndDelete({ _id: req.params.id })

        if (!offer) {
            return res.status(404).send()
        }
        res.send(offer)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router