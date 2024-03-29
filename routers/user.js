const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')

const upload = multer({
    dest: 'avatars'
})

router.post('/user/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
})

router.post('/users', async (req,res) => {
    const user = new User(req.body)
 
 try{
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with same email already exists!" });
    }
     await user.save()
     const token = await user.generateAuthToken()
     res.status(201).send({ user, token })
 } catch(e){
     res.status(400).send(e)
 }
 })
 
 router.post('/users/login', async (req,res) => {
    const user = new User(req.body)
 
 try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user , token })
 } catch(e){
     res.status(400).send(e)
     console.log(e)
 }
 })

 router.post('/users/logout', auth, async (req, res) => { 
 try{
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()

    res.status(200).send()
 } catch(e){
    console.log(e)
     res.status(500).send()
 }
 })

 router.post('/users/logoutAll', auth, async (req, res) => { 
    try{
       req.user.tokens = []
       await req.user.save()
       res.send()
    } catch(e){
        res.status(500).send()
    }
    })

 router.get('/users' , auth, async (req, res) => {
     try{
         const users = await User.find({})
         res.send(users)
     } catch(e){
         res.status(500).send()
     }
 })

 router.get('/users/me' , auth, async (req, res) => {
        res.send(req.user)
})
 
 router.get('/userID/:id' , async (req, res) => {
     const _id = req.params.id
 
     try{
         const user = await User.findById(_id)
         if(!user){
             return res.status(404).send()
         }
         res.send(user)
     } catch(e){
         res.status(500).send()
     }
 })

//  router.patch('/users/:id' , async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = [' name' , 'email' , ' password', 'age' ]

//     try {
//         const user = await User.findById(req.params.id)

//         updates.forEach((update) => user[update] = req.body[update])  
//         await user.save()

//         if(!user) {
//         return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) { 
//         res.status(400).send(e)
//     }
//     })

router.patch('/users/me' , auth , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [' name' , 'email' , ' password', 'age' ]

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])  
        await req.user.save()
        res.send(req.user)
    } catch (e) { 
        res.status(400).send(e)
    }
    })

    router.delete('/users/me' , auth , async (req, res) => {
        try {
            await req.user.remove()
            
            res.send(req.user)
        }catch(e) {
            res.status(500).send()
        }
    })

module.exports = router