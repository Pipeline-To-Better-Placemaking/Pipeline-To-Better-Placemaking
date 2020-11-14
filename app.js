const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const config = require('./utils/config')

console.log('Connecting to ', config.DB_URI)
mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log('Error connecting to database: ', error.message)
    })

const routes = require('./routes.js');

const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json())
app.use('/api/users',routes)

app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.js')(passport)

const expressSession = require('express-session')({
  secret: 'secretssss',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000}
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})


