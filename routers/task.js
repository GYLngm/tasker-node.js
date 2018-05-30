
const express = require('express')
const User = require('../models/User')
const Task = require('../models/Task')

const router = express.Router()

router.get('/',function(req,res){
	var username = req.cookies.username
	var resData = []
	var str = ''

	if(!req.cookies.username){
		res.redirect('/login')
	}else{
		Task.find({
			username : username
		}).then(function(userInfo){
			res.cookie('username', username, {maxAge: 80000})
			req.session.user = username

        	for( var i=0; i < userInfo.length; i++ ){
        		var tempData = {
        			name : userInfo[i].t_name,
        		}
						resData.push(tempData);
						tempData = {}
        	}
			res.render('task.ejs', {tnum: userInfo.length, tasklist: resData})
		})
		}

})

router.get('/:id', async function(req,res){

})

router.post('/getdetail', async function(req,res){
	var resData = []
	console.log(req.body.name)
	if(!req.cookies.username){
		console.log('exit')
		res.redirect('/login')
	}else{
		var username = req.cookies.username
		var taskname = req.body.name
		if(!taskname){
			console.log('null title')
		}else{
			Task.find({
				username:username,
				t_name:taskname
			}).then(function(userInfo){

				var date = new Date(userInfo[0].date)
				Y = date.getFullYear() + '-'
				M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
				D = date.getDate() + ' '
				h = date.getHours() + ':'
				m = date.getMinutes()
				resData.push({
					taskName: userInfo[0].t_name,
					taskdescript: userInfo[0].t_descript,
					type: userInfo[0].t_type,
					date: Y + M + D + h + m
				})
				console.log(resData)
				res.send(resData)
			})
		}
	}
})

router.post('/addnewtask', async function(req,res){
	var taskName = req.body.taskName
	var taskdescript = req.body.taskdescript
	var tasktype = req.body.tasktype
	var username = req.cookies.username
	var timestamp = Date.parse(new Date())

	if(!req.cookies.username){
		console.log('exit')
		res.redirect('/login')
	}else{
		if(!taskName){
			console.log('null title')
		}
		if(!taskdescript){
			console.log('null description')
		}
		if(!tasktype){
			console.log('null tasktype')
		}

		var content = {t_name:taskName,t_descript:taskdescript,username:username,t_type: tasktype,state:false,date:timestamp}
			var tableInsert = new Task(content)
			console.log('save data')
			tableInsert.save(function(err){
				if(err){
					console.log(err)
				}else{
					console.log('insert success')
	                res.redirect('/login')
				}
			})
		}
})

module.exports = router
