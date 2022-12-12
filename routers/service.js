const express = require('express');
const Salon = require('../models/service')
const router = new express.Router()

router.post('/services', async (req,res) => {
    const services = new service(req.body)
    try{
        await services.save()
        res.status(201).send(services)
    } catch(e){
        res.status(400).send(e)
    }
 })

 router.get('/services' , async (req, res) => {

    try{
        const services = await Service.find({})
        res.send(services)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/services/:id' , async (req, res) => {
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
    const allowedUpdates = [' name' , 'email' , ' phone' ]

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