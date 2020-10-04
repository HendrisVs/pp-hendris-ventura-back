const express = require('express'); 
const morgan = require('morgan');
const app = express();
const path = require('path');
const { mongoose } = require('./database')
//Settings
app.set('port', process.env.PORT || 3000); 

//Middlewares

app.use(morgan('dev'));
app.use(express.json());

//Routes
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, '../mean-frontend/index.html'));
  });
app.use('/users', require('./routes/users.routes'))

//Static Files
app.use('/js', express.static(path.join(__dirname, '../mean-frontend/static/js')));

//Start the server
app.listen(app.get('port'),()=>{
    console.log("Port = " + app.get('port')); 
}); 


