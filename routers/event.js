
const express = require('express')
const Event= require('../models/Event')


const router = express.Router()

router.get('/', function(req,res){
	var username = req.cookies.username
	Event.find({
		username : username
	}).then(function(userInfo){
		req.session.user = username
		res.cookie('username', username, {maxAge: 80000})

		res.render('event.ejs')
	})

})

router.get('/:tname', async function(req,res){
	
})

module.exports = router
