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
    connectionString: process.env.DATABASE_URL,
	  ssl: true
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => { res.send('it is working') })
app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)});
app.put('/image', (req,res) =>{image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) =>{image.handleApicall(req,res)});

app.listen( process.env.PORT || 3000, () => {
	console.log(`Working on port ${process.env.PORT}`);
})