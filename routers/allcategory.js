const express = require('express');
const allcategory = require('../models/allcategory')
const router = new express.Router()

 router.get('/Allcategory' , async (req, res) => {

    try{
        const category = await allcategory.find()
        res.send(category)
    } catch(e){
        res.status(500).send()
    }
})


module.exports = router