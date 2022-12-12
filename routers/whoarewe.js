const express = require('express');
const whoAreWe = require('../models/whoarewe')
const router = new express.Router()

router.get('/whoAreWe/:id' , async (req, res) => {
    const _id = req.params.id
    try{
        const whoarewe = await whoAreWe.findById(_id)
        if(!whoarewe){
            return res.status(404).send()
        }
        res.send(whoarewe)
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
})

router.patch('/whoAreWe/:id' , async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const whoarewe = await whoAreWe.findById(req.params.id)

        updates.forEach((update) => whoarewe[update] = req.body[update])  
        await whoarewe.save()

        if(!whoarewe) {
        return res.status(404).send()
        }
        res.send(whoarewe)
    } catch (e) { 
        res.status(400).send(e)
    }
    })

module.exports = router