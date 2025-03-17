const bcrypt = require('bcrypt');
// The password you want to hash

const plainPassword = 'admin1234';  // The password you want to hash


bcrypt.hash(plainPassword, 10, function(err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log("Hashed Password: ", hash);
  }
});
