const express = require('express');
const Category = require('../models/category')
const router = new express.Router()

router.post('/category', async (req,res) => {
    const category = new Category(req.body)
    try{
        await category.save()
        res.status(201).send(category)
    } catch(e){
        res.status(400).send(e)
    }
 })

 router.get('/category' , async (req, res) => {

    try{
        const category = await Category.find()
        res.send(category)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router