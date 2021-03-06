const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Define the model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save hook, encrypt password
// Before saving a model, run this function
// Saving a password: salt + plain password = salt + hashed password
userSchema.pre("save", function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.pass, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // overwirte plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;
