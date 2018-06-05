// keys.js - Determine set of credentials to return
if (process.env.NODE_ENV === 'production') {
  //In production - return prod keys
  module.exports = require('./prod');
} else {
  //In development
  module.exports = require('./dev');
}
