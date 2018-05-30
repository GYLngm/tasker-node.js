
const express = require('express')
const Event= require('../models/Event')


const router = express.Router()

router.get('/', function(req,res){
	var username = req.cookies.username
	var resData = []
	Event.find().then(function(userInfo){
		req.session.user = username
		res.cookie('username', username, {maxAge: 80000})
		for(let i=0;i<userInfo.length;i++){
			var tempData ={
				name: userInfo[i].e_name,
				description: userInfo[i].e_descript,
				member: userInfo[i].e_member
			}
			resData.push(tempData)
		}
		console.log(resData)
		res.render('event.ejs', { resData: resData })
	})

})

router.get('/:tname', async function(req,res){

})

module.exports = router
