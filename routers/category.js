const express = require('express');
const Category = require('../models/category')
const auth = require('../middleware/auth');
const router = new express.Router()

router.post('/category', auth, async (req,res) => {
    const category = new Category({
        ...req.body,
        email:req.user.email
    })
    
    try{
        await category.save()
        res.status(201).send(category)
    } catch(e){
        res.status(400).send(e)
    }
 })
 router.get('/category/:email' , async (req, res) => {
    const Email = req.params.email

    try{
        const category = await Category.find({  email:Email })
        res.send(category)
    } catch(e){
        res.status(500).send()
    }
})

router.delete('/category/:id/:cat' , async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ email: req.params.id ,  category: req.params.cat })

        if (!category) {
            return res.status(404).send()
        }
        res.send(category)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router