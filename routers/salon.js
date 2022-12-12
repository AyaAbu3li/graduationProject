const express = require('express');
const Salon = require('../models/salon')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/salons', async (req,res) => {
    const salons = new Salon(req.body)
    const user = new User({...req.body,role: 4})
    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ msg: "User with same email already exists!" });
        }
        await salons.save()
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(e){
        res.status(400).send(e)
    }
 })
 router.get('/salon' ,auth, async (req, res) => {
    email = req.user.email
    try{
        const salon = await Salon.findOne({ email });
        if(!salon){
            return res.status(404).send()
        }
        res.send(salon)
    } catch(e){
        res.status(500).send()
    }
})
 router.get('/salons' , async (req, res) => {

    try{
        const salons = await Salon.find({})
        res.send(salons)
    } catch(e){
        res.status(500).send()
    }
})
router.get('/salons/:id' , async (req, res) => {
    const _id = req.params.id

    try{
        const salon = await Salon.findById(_id)
        if(!salon){
            return res.status(404).send()
        }
        res.send(salon)
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/salons/:id' , async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const salon = await Salon.findById(req.params.id)
        email = salon.email
        const existingUser = await User.findOne({ email });

        updates.forEach((update) => salon[update] = req.body[update])  
        await salon.save()

        updates.forEach((update) => existingUser[update] = req.body[update])  
        await existingUser.save()

        if(!existingUser) {
            return res.status(404).send()
        }

        if(!salon) {
        return res.status(404).send()
        }
        res.send(salon)
    } catch (e) { 
        res.status(400).send(e)
    }
    })

    router.delete('/salons/:id' , async (req, res) => {
    try {
        const existingSalon = await Salon.findById( req.params.id );
        email = existingSalon.email
        const existingUser = await User.findOne( {email} );

        const salon = await Salon.findByIdAndDelete(req.params.id)
        const user = await User.findByIdAndDelete(existingUser._id)

        if (!salon) {
            return res.status(404).send()
        }
        if (!user) {
            return res.status(404).send()
        }
        res.send(salon)
    }catch(e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router