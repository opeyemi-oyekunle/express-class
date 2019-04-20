var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator/check');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Global vars (middleware)
app.use((req, res, next)=>{
  res.locals.success = null;
  res.locals.error = null;
  next();
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//students object initiation
var students = [
 {name:"Opeyemi", age:12, score:56},
 {name:"Oyekunle", age:10, score:87},
 {name:"Oyetunde", age:8, score:45}
]

app.get('/', (req, res)=> {
  res.send(`<div>
    <h2>Home Page</h2>
    <p>ID: ${req.query.id} </p>
    <p>Title: ${req.query.title} </p>
    <p>Writer: ${req.query.writer} </p>
    </div>`
  );
});

app.get('/book/:id/:title', (req, res)=> {
  res.send(`<div>
    <h2>Book Store</h2>
    <p>ID: ${req.params.id} </p>
    <p>Title: ${req.params.title} </p>
    </div>`
  );
});

app.get('/home', (req, res)=>{
  res.render('index', {
   title: "Using EJS",
   students
   })
})

app.post('/students', (req, res)=>{
 const {name, age, score} = req.body
   if (name=='' || age=='' || score=='') {
     res.render('index', {
     title: 'Students',
     error:'No student has been added',
     students
   });
   }else{
     students.push({name, age, score})
     res.render('students', {
      title: 'Students',
      success:'Student has been added',
      students
    });
  }
})

app.put('/update', (req, res)=> {
 res.send('Student Updated');
});

app.delete('/delete', (req, res)=> {
 res.send('Student Deleted');
});

app.get('*', (req, res)=>{
 res.send('Error: Page not found');
});

const PORT = process.env.PORT || 5000
var server = app.listen(PORT, ()=> {
 console.log(`The server is on port ${PORT}`);
});
