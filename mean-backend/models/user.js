const mongoose = require("mongoose"); 
const { Schema } =  mongoose; 

const userSchema = new Schema({
    name:   {type: String, required: true}, 
    mail:   {type: String, required: true}, 
    phone:  {type: String, required: true}, 
    password:{type: String, required: true}, 
    age:    {type: Number, required: true}, 
    genre:  {type: String, required: true}, 
    hobby:  {type: String, required: true}, 
    registerDate:{type: Date, required: true}
})

module.exports = mongoose.model('User', userSchema); 