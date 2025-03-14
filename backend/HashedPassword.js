const bcrypt = require('bcrypt');

<<<<<<< HEAD
const plainPassword = 'true1234';  // The password you want to hash
=======
const plainPassword = 'admin1234';  // The password you want to hash
>>>>>>> cd8fa986531d2e8053cc0b5852f49b9c56a351e4

bcrypt.hash(plainPassword, 10, function(err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log("Hashed Password: ", hash);
  }
});
