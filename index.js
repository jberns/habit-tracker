const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //Express to serve up production assets (main.css and main.js)
  app.use(express.static('client/build'));
  //Express to serve up index.html
  const path = require('path');
  app.get('*', () => (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', index.html));
  });
}

//Route Handler for port
const PORT = process.env.PORT || 5000;
app.listen(PORT);