const express = require('express') 
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cookieParser('asdfasdf'))
app.use(session({
  secret: 'keybord cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash())

app.get('/', (req, res) => {
  var emailError = req.flash('emailError')
  var pointError = req.flash('pointError')
  var nameError = req.flash('nameError')

  var email = req.flash('email')
  var name = req.flash('name')
  var points = req.flash('points')

  emailError = (emailError === undefined || emailError.length === 0) ? undefined: emailError
  pointError = (pointError === undefined || pointError.length === 0) ? undefined: pointError
  nameError = (nameError === undefined || nameError.length === 0) ? undefined: nameError

  email = (email === undefined || email.length === 0) ? '': email
  name = (name === undefined || name.length === 0) ? '': name
  points = (name === undefined || isNaN(points)) ? undefined: points
  
  
  res.render('index',{emailError, pointError, nameError, email, name, points})
})

app.post('/form', (req, res) => {
  var {email, name, points} = req.body
  var emailError, pointError, nameError

  if (email === undefined || email === ''){
    emailError = 'O email deve ser definido.'
  }

  if (name === undefined || name === ''){
    nameError = 'O nome deve ser definido.'
  }

  if (points === undefined || points < 0 || points > 100){
    pointError = 'Os pontos devem ser definidos entre 0 e 100.'
  }

  if (name.length < 2 || name.length > 30){
    nameError = 'O nome deve ter entre dois e trinta caracteres.'
  }

  if (emailError !== undefined || pointError !== undefined || nameError !== undefined) {
    req.flash('emailError', emailError)
    req.flash('pointError', pointError)
    req.flash('nameError', nameError)

    req.flash('email', email)
    req.flash('name', name)
    req.flash('points', points)

    res.redirect('/')
  } else {
    res.send('congratulation')
  }
})


app.listen(5678, (req, res) => {
  console.log(`
  APP online!
  ===================
  http://localhost:5678/`)
})