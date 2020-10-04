const userController =  {}; 
const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const saltRounds = 10;


userController.getUsers = async(req, res)=>{
    name = req.query.name
    hobby = req.query.hobby

    if ((name != "" && name!= undefined) && (hobby != "" && hobby!= undefined) ){        
        users = await User.find({ $and: [ { "name":  {$eq: name } }, { "hobby": {$eq: hobby} } ] }); 
        }
    else if(name != "" && name!= undefined){
        users = await User.find({ "name":  {$eq: name }});
        }
    else if(hobby != "" && hobby!= undefined){
        users = await User.find({ "hobby":  {$eq: hobby }}); 
        }
    else
        {
            users = await User.find(); 
        }
    res.json(users); 
}

userController.getGroups = async(req, res)=>{
    var date = new Date();
    dateReference = date.addDays(-3);
    const user = await User.aggregate([
        { 
        $match:{ genre: "Male", 
                age:{$gte:18},
                registerDate:{$gte: dateReference}
                }
        }]); 
    
    res.json(user); 
}

userController.getUser = async(req, res)=>{
    const user = await User.findById(req.params.id); 
    res.json(user); 
}

userController.createUser = async(req,res)=>{
    tmpPss =  req.body.password
    bcrypt.hash(tmpPss, saltRounds, (err, hash) => {
        req.body.password =  hash; 
        const user = new User(req.body); 
        user.save();
        res.json({"status":"User saved"}); 
    });
}

userController.editUser = async(req, res) =>{
    const user = {
        name:req.body.name,
        mail:req.body.mail,
        password:req.body.password,
        phone:req.body.phone,
        age:req.body.age,
        genre:req.body.genre,
        hobby:req.body.hobby
        }

    await User.findByIdAndUpdate(req.params.id, {$set:user}, {new:true}); 
    res.json({status:"Updated"}); 
}

userController.deleteUser = async (req, res)=>
{
    console.log("delete")
    console.log(req.params.id)
    await User.findByIdAndDelete(req.params.id); 
    res.json({status:"Deleted"}); 
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
module.exports = userController; 
