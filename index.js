const express = require('express') 
const flash = require('express-flash')
const session = require('express-session')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
  secret: 'keybord cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure:true }
}))
app.use(flash())

app.get('/', (req, res) => {
  res.send('Online!')
})


app.listen(5678, (req, res) => {
  console.log(`
  APP online!
  ===================
  http://localhost:5678/`)
})