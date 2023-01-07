const express = require('express');
const Rating = require('../models/rating')
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = new express.Router()

router.post('/rating', auth, async (req,res) => {
    const rating = new Rating({
        ...req.body,
        owner:req.user._id
    })
    
    try{
        await rating.save()
        res.status(201).send(rating)
    } catch(e){
        res.status(400).send(e)
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