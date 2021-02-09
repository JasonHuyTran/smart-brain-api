const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = require('knex')({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
});

app.get('/', (req, res) => res.send("it is working!"));

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

app.put('/image', (req, res) => image.handleImage(req, res, db));

app.listen((process.env.PORT || 3000), () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

// //implement later 
// app.get('/profile/:id', (req, res) => {
//     const {id} = req.params;
//     db.select('*').from('users').where('id', id).then(user => {
//         if(user.length) {
//             res.json(user[0]);
//         }
//         else {
//             res.status(400).json('Not found');
//         }
//     });
// });