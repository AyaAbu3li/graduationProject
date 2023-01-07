const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const bodyParser = require('body-parser');

const userRouter = require('./routers/user')
const salonRouter = require('./routers/salon')
const offerRouter = require('./routers/offer')
const offerServicesRouter = require('./routers/offerServices')
const serviceRouter = require('./routers/service')
const whoAreWeRouter = require('./routers/whoarewe')
const booking = require('./routers/booking')
const message = require('./routers/message')
const employee = require('./routers/employee')
const category = require('./routers/category')

connectDB()

const app = express()

const multer = require('multer')
const upload = multer({
    dest: 'images'
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// require('./config/passport')(passport)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use(userRouter)
app.use(salonRouter)
app.use(offerRouter)
app.use(serviceRouter)
app.use(offerServicesRouter)
app.use(whoAreWeRouter)
app.use(booking)
app.use(message)
app.use(employee)
app.use(category)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))