document.cookie = 'flag=true'
var username = $('#username').text()
var socket = io.connect('http://localhost:8880')
socket.emit('login', {username: username})


$('#editBtn').on('click', function () {
    var newName = $('#newName').val()
    var newImage = $('#editImage').attr('src')
    $('#userImage').attr('src', newImage)
    $('#username').html(newName)
    $('#changeInfo').modal('hide')
    socket.emit('edit', {newName: newName, newImage: newImage, username: username})
})

$('#addtask').click(function() {

	var taskName=$('#t_name').val()
	var taskdescript=$('#t_description').val()
    var tasktype=$('#t_type').val()

    if( $('#t_name').val() == ''){
        alert('give a title for your task')
    }else {
        $.post('/task/addnewtask', {taskName: taskName, taskdescript:taskdescript, tasktype: tasktype},function(res){
            location.href = 'home'
        })
    }


})



var username = $('#username').text()
        //function gototask(){
    $('#task').click(async function(){
    	$.post('home/mytasks', {username:username}, function(res){
          	location.href = 'task'
        })
})

$('#event').click(async function(){
            $.post('/home/myevents', {username : username}, function(res){
                location.href = 'event'
            })
        })


$('#info').click(async function(){
    location.href = 'home'
})


$('#news').click(async function(){
    $('#news').click(function(){
            $.post('/home/addnew', {username: username}, function(res){
                location.href = 'news'
            })
        })
})

$('#about').click(async function(){
    $.post('/home/goabout', function(res){
        location.href = 'about'
    })
})

$('#exitBtn').click(function(){
    location.href = 'exit'
})

$('.taskbutton').click(async function(res){
  var name = res.target.id
  console.log(name)
  $.post('/task/getdetail', {name: name, username: username}, function(res){
    var taskname = document.getElementById("taskname")
  	var desc = document.getElementById("description")
  	var tasktype = document.getElementById("type")
    var tdate = document.getElementById("tdate")
  	taskname.innerHTML = res[0].taskName
    desc.innerHTML = res[0].taskdescript
    tasktype.innerHTML = res[0].type
    tdate.innerHTML = res[0].date
  },"json")
})

/*$('#showlist').click(function(){
    var tlist = ''
    $.get('/task/showlist', function(res){
        tlist = JSON.parse(res)
        var len = tlist.length
        var str = ''
        var uls = $('#tasks')

        for(var i=0;i<len;i++){
            str = '<li><a href="#">' + tlist[i].t_name + '</a></li>'
        }
    })
    location.reload()
})*/
