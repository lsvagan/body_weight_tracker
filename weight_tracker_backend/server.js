const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:test@localhost:5432/weight_tracker');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req,res) => {
   db.any('SELECT * FROM users')
   .then(data => console.log('DATA:', data))
   .catch(err => console.log('ERROR:', err))
})


app.post('/register', (req, res) => {
   let {name, email, password} = req.body;

   const hash = bcrypt.hashSync(password, saltRounds);

   const insert = {
      name,
      email,
      password : hash,
   }
   
   db.one('INSERT INTO users(name,email,hash) VALUES(${name}, ${email}, ${password}) RETURNING user_id, name', insert)
   .then(data => {
      console.log('DATA:', data)
      res.json(data);
    })
    .catch(err => console.log(err))
})


app.post('/signin', (req, res) => {
   const {email, password} = req.body;

   db.one('SELECT user_id, name, hash FROM users WHERE email = ${email}', req.body)
   .then(user => {
      let isValid = bcrypt.compareSync(password, user.hash);
     if(isValid){
        res.json({
           user_id: user.user_id,
           name: user.name
        });
     }else{
        res.status(400).json("* Wrong email or password. Try again.")
     }
   })
   .catch(err => res.status(400).json("* Wrong email or password. Try again."))
})


app.post('/measurements', (req, res) => {

   db.any('SELECT * FROM measurements WHERE user_id = ${user_id} ORDER BY date ASC', req.body)
   .then(data => {

      for (let i = 0; i < data.length; i++) {
         data[i].date = dateformat(data[i].date);
      }
      
      res.json(data)
   })
   .catch(err => console.log(err))
})


app.post('/add', (req, res) => {
 
   db.one('INSERT INTO measurements(date, value, user_id) VALUES (${date}, ${value}, ${user_id}) RETURNING * ', req.body)
   .then(data => {

      data.date = dateformat(data.date);
      
      res.json(data)
   })
   .catch(err => console.log(err))
})


const dateformat = (dbdate) => {
   let date = dbdate.getDate();
   let month = (dbdate.getMonth()+1); 
   let year = dbdate.getFullYear();
   
   dbdate = `${date}/ ${month}/ ${year} `;
   return dbdate;
}


app.delete('/remove', (req, res) => {
   db.one('DELETE FROM measurements WHERE id = ${id} RETURNING *', req.body)
   .then(data => res.json(data))
   .catch(err => console.log(err))
})


app.listen(3000, () => {
   console.log('Server running on port 3000');
})