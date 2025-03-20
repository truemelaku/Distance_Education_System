const bcrypt = require('bcrypt');
<<<<<<< HEAD

<<<<<<< HEAD
const plainPassword = 'true1234';  // The password you want to hash
=======
const plainPassword = 'admin1234';  // The password you want to hash
>>>>>>> cd8fa986531d2e8053cc0b5852f49b9c56a351e4
=======
// The password you want to hash

const plainPassword = 'admin1234';  // The password you want to hash

>>>>>>> 5300dcd507ec22af243924c44429b5c1b384c539

bcrypt.hash(plainPassword, 10, function(err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log("Hashed Password: ", hash);
  }
});
