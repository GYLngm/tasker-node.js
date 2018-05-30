/**
 * Created by zZ on 2017/5/27.
 */

const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/', function (req, res) {
    res.render('register.ejs')
})

router.post('/signUp', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    var gender = req.body.gender
    var resData = {}
    var dateofbrith = req.body.dateofbrith
    var dateString =req.body.dateString
    var age = getAge(dateofbrith)

    console.log(age)
    console.log(email)
    console.log(gender)

    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo) {
            resData.success = 0
            resData.err = "该用户名已被注册！"
            res.json(resData)
            return false
        } else {
            var user = new User({
                username: username,
                password: password,
                image: '../public/img/people.png',
                state: false,
                email: email,
                gender: gender,
                age: age,
                dateofbrith: dateString
            })
            return user.save()
        }
    }).then(function () {
        resData.success = 1
        resData.message = "注册成功！"
        res.json(resData)
    })
})

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


module.exports = router;
