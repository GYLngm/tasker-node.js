
const express = require('express')

const router = express.Router()

router.get('/', function(req,res){
	var username = req.cookies.username
	res.cookie('username', username, {maxAge: 80000})
	res.render('about.ejs')
})

module.exports = router
