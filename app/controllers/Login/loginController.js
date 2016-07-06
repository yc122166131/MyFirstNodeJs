var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');
  UserModel = require('../../models/Login/User');
  eventproxy = require('eventproxy');


module.exports = function (app) {
  app.use('/login', router);
};


router.post('/signup', function (req, res, next) {
    var _username = req.body.loginname;
    var _pass = req.body.pass;
    var _email = req.body.email;
    var _confirmPass = req.body.confirm_pass;
    var ep =  eventproxy();

    //判断是否都不是空~
    var hasEmptyInfo = [_username,_pass,_email,_confirmPass].some(function(item){
      return item === '';
    });

    if(hasEmptyInfo){
        res.render('userLogin/login',{error:"数据填写不完整~"});
        return;
    }

    var isPassDiff = _pass !== _confirmPass;
    if(isPassDiff){
        res.render('userLogin/login',{error:"两次输入的密码不同~"});
        return;
    }

    var user = {username:_username,pass:_pass,email:_email,lastloginDateTime:Date.now()};

    ep.on("regist",function(ms){
        res.render('userLogin/login',{"success":"注册成功！"});
    });

    UserModel.addUserInfo(user,function(err,result){

            ep.emit("regist", "注册成功！");


    });



});

router.post('/ajaxsignupvalidation',function(req, res){
    var ep =  eventproxy();
    var _username = req.body.loginName;

    ep.on("userName_is_exist",function(msg){
        if(msg){
            res.json(msg);
        }else{
            res.json("111");
        }
    });

    UserModel.isExistByLoginName(_username,function(err,result){
        if(result) {
            console.log(result);
            ep.emit("userName_is_exist", result);
        }
    });




});

