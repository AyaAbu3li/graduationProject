const express = require('express');
const OfferServices = require('../models/offerServices')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/offerservice', auth ,async (req,res) => {
    const offerservice = new OfferServices({
        ...req.body,
        salonname: req.user.name,
    })
    try{
        await offerservice.save()
        res.status(201).send(offerservice)
    } catch(e){
        res.status(400).send(e)
    }
 })

 router.get('/offerservices/:id' , async (req, res) => {
    try{
        const offers = await OfferServices.find({ })
        res.send(offers)
    } catch(e){
        res.status(500).send()
    }
})

router.delete('/offerservice/:id' , async (req, res) => {
    try {
        const offerservice = await OfferServices.findOneAndDelete({ _id: req.params.id })
        if (!offerservice) {
            return res.status(404).send()
        }
        res.send(offerservice)
    }catch(e) {
        res.status(500).send()
    }
})

// router.get('/offerservice/:id' , auth, async (req, res) => {
//     const _id = req.params.id

//     try{
//        const offerservice = await OfferServices.findOne({ _id, owner: req.user._id })

//         if(!offerservice){
//             return res.status(404).send()
//         }

//         res.send(offerservice)
//     } catch(e){
//         res.status(500).send()
//     }
// })

// router.get('/offerservice/:id' , async (req, res) => {
//     const _id = req.params.id

//     try{
//        const offerservice = await OfferServices.findOne({ _id })

//         if(!offerservice){
//             return res.status(404).send()
//         }

//         res.send(offerservice)
//     } catch(e){
//         res.status(500).send()
//     }
// })

// router.patch('/offerservice/:id' , async (req, res) => {
//     const updates = Object.keys(req.body)

//     try {
//         const offerservice = await OfferServices.findOne({ _id: req.params.id})

//         if(!offerservice) {
//         return res.status(404).send()
//         }

//         updates.forEach((update) => offerservice[update] = req.body[update])  
//         await offerservice.save()
//         res.send(offerservice)
//     } catch (e) { 
//         res.status(400).send(e)
//     }
//     })



module.exports = router