import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  updated_at: Date,
});

UserSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  if (this.isModified("password")) {
    bcrypt.genSalt(10,  (err, salt) =>{
      if (err) throw err;
      bcrypt.hash(this.password, salt,  (err, hash) => {
        if (err) throw err;
        else {
          this.password = hash;
          next();
        }
      });
    });
  }
});

export default mongoose.model("User", UserSchema);
