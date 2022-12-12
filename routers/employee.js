const express = require('express');
const Employee = require('../models/employee')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/employee', auth ,async (req,res) => {
    const employee = new Employee({
        ...req.body,
        salonname: req.user.name
    })
    try{
        await employee.save()
        res.status(201).send(employee)
    } catch(e){
        res.status(400).send(e)
    }
 })

 router.get('/employee' , auth, async (req, res) => {
    console.log(req.user._id)
    try{
        const offers = await Employee.find({  })
        // owner: req.user._id
        res.send(offers)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/employee/:id' , async (req, res) => {
    const _id = req.params.id

    try{
       const employee = await Employee.findById({ _id })

        if(!employee){
            return res.status(404).send()
        }
        res.send(employee)
    } catch(e){
        res.status(500).send()
    }
})


router.patch('/employee/:id' , async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const employee = await Employee.findOne({ _id: req.params.id})

        if(!employee) {
        return res.status(404).send()
        }

        updates.forEach((update) => employee[update] = req.body[update])  
        await employee.save()
        res.send(employee)
    } catch (e) { 
        res.status(400).send(e)
    }
    })

    router.delete('/employee/:id' , async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({ _id: req.params.id })

        if (!employee) {
            return res.status(404).send()
        }
        res.send(employee)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router