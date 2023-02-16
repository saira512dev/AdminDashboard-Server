import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: {
        type: Array,
        default: [],
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin"
    },
    password: String
},
{ timestamps: true}
)

// Password hash middleware.
 
UserSchema.pre('save', function save(next) {
    const user = this
    console.log(this)
    // if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err) }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return next(err) }
        user.password = hash
        console.log(hash)
        next()
      })
    })
  })
  
  
  // Helper method for validating user's password.
  
  UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch)
    })
  }


const User = mongoose.model("User", UserSchema);
export default User;