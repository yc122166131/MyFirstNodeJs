/**
 * Created by yuanchen on 2016/7/5.
 */
// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    pass: String,
    email: String,
    lastloginDateTime:Date
});


UserSchema.statics.isExistByLoginName= function(loginname,callback){

    this.findOne({username:loginname},callback);

};

UserSchema.statics.addUserInfo= function(user,callback){

    this.create(user,callback);

};

module.exports = mongoose.model('User', UserSchema);

