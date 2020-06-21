const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express();

const register = require('./controllers/register'); 
const signin = require('./controllers/signin'); 
const image = require('./controllers/image'); 

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'qwerty',
    database : 'facedb'
  }
});

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)});
app.put('/image', (req,res) =>{image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) =>{image.handleApicall(req,res)});


app.listen(3000, ()=> {
	console.log("working on 3000");
})