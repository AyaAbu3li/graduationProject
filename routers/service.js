const express = require('express');
const Service = require('../models/service')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/services', auth, async (req,res) => {
    const _id = req.params.id

    const services = new Service({
        ...req.body,
        owner: req.user._id,
        salonEmail: req.user.email
    })
    try{
        await services.save()
        res.status(201).send(services)
    } catch(e){
        res.status(400).send(e)
    }
 })

 router.get('/services' , auth, async (req, res) => { // for salon account

    try{
        const services = await Service.find({ owner: req.user._id })
        res.send(services)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/services/:salonEmail' , async (req, res) => { // for user account
    const salonemail = req.params.salonEmail
    try{
        const services = await Service.find({ salonEmail:salonemail })
        res.send(services)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/service/:id' , async (req, res) => {
    const _id = req.params.id

    try{
        const service = await Service.findById(_id)
        if(!service){
            return res.status(404).send()
        }
        res.send(service)
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/services/:id' , async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const service = await Service.findById(req.params.id)

        updates.forEach((update) => service[update] = req.body[update])  
        await service.save()

        if(!service) {
        return res.status(404).send()
        }
        res.send(service)
    } catch (e) { 
        res.status(400).send(e)
    }
    })

    router.delete('/services/:id' , async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id)
        if (!service) {
            return res.status(404).send()
        }
        res.send(service)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router