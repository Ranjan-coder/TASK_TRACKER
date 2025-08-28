const { Signup, Login } = require('../controller/authController')

const router = require('express').Router()


router.get('/home',(req,res)=>{
    res.send("Backend is running")
})
router.post('/signup',Signup)
router.post('/login',Login)

module.exports = router