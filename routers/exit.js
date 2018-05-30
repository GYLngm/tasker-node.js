/**
 * Created by zZ on 2017/5/27.
 */
var express = require('express')
var User = require('../models/User')

const app = new express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

var router = express.Router()


router.get('/', function (req, res) {
	console.log('exit')
        req.session.destroy()
        res.redirect('/login')
})

module.exports = router