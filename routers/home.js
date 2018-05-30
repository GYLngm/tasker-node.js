
const express = require('express')
const User = require('../models/User')
const Task = require('../models/Task')
const Event = require('../models/Event')

const router = express.Router()


router.get('/', function (req, res) {
	console.log('enter home')
    if (!req.session.user) {
    	console.log('back to login')
        res.redirect('/login')
    } else {
        	console.log('find user: ' + req.session.user)
			User.findOne({
				username: req.session.user
			}).then(function(userInfo){
				console.log('user: '+ userInfo.username +' found, render home')
				req.session.user = userInfo.username
				res.render('home.ejs',{
					username: userInfo.username,
					age: userInfo.age,
					sex: userInfo.gender,
					email: userInfo.email
				})
			})
    }
})

router.post('/mytasks', async function(req, res){
	var username = req.session.user
	console.log('check user: '+ username)
	if (!req.session.user) {
        res.redirect('/login')
    } else {
    	console.log('check user 2')

	    	console.log('find tasks by user: '+req.session.user)
			Task.find({
				username: username
			}).then(function(userInfo){
					res.cookie('username',req.session.user,{maxAge: 80000})
					res.redirect('/task')
				//res.json(resData)

			})
    }
})

router.post('/myevents', async function(req, res){
	var username = req.session.user
	console.log('check user: '+username)
	if(!req.session.use){
		res.redirect('/login')
	} else {
		Event.find({username : username}).then(function(eventInfo){
			if(!eventInfo.data){
				console.log('empty')
			}
			res.cookie('username',req.session.user,{maxAge: 80000})
			res.redirect('/event')
		})
	}
})

router.post('/goabout', async function(req, res){
	var username = req.session.user
	console.log('check user: '+ username)
	if(!req.session.use){
		res.redirect('/login')
	} else {
			res.cookie('username',req.session.user,{maxAge: 80000})
			res.redirect('/about')
	}
})

router.post('/addnew', async function(req, res){
	var username = req.session.user
	console.log('check user: '+ username)
	if(!req.session.use){
		res.redirect('/login')
	} else {
			res.cookie('username',req.session.user,{maxAge: 80000})
			res.redirect('/news')
	}
})

module.exports = router
