const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

/**
 * @swagger
 *  definitions:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - firstName
 *          - lastName
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string
 *            format: password
 *            minimum: 4
 *          firstName:
 *            type: string 
 *          lastName:
 *            type: string
 */

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
}, {timestamps: true});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id, delete ret.password }
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  }).catch(err => next(err));
});

module.exports = mongoose.model("User", userSchema);