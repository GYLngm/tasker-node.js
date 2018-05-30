
const express = require('express')
const Task= require('../models/Task')

const router = express.Router()

router.get('/', function(req,res){
	var username = req.cookies.username
	if(!req.cookies.username){
		res.redirect('/login')
	} else {
		req.session.user = username
		res.render('new.ejs')
	}
	

})


module.exports = router
