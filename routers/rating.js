const express = require('express');
const Rating = require('../models/rating')
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = new express.Router()

router.post('/CRrating/:email', auth, async (req,res) => {
    const Email = req.params.email

    const rating = new Rating({
        ...req.body,
        owner:req.user._id
    })

    try{
        const ratingg = await Rating.findOne({  email:Email,owner:req.user._id })
        if(ratingg) {
            const raating = await
            Rating.findOneAndDelete({  email:Email,owner:req.user._id })
        }
        await rating.save()
        res.status(201).send(rating)

    } catch(e){
        res.status(400).send(e)
    }
 })

 router.get('/rateing/:email' , auth, async (req, res) => {
    const Email = req.params.email

    try{
        const rating = await Rating.findOne({  email:Email,owner:req.user._id })
       if(!rating) res.send(0)
        res.send(rating)
    } catch(e){
        res.status(500).send()
    }
})

 router.get('/rating/:email' , async (req, res) => {
    const Email = req.params.email

    try{
        const rating = await Rating.find({  email:Email })
        res.send(rating)
    } catch(e){
        res.status(500).send()
    }
})


module.exports = router