import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hashing the password before saving it into the DB
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
  next();
});

// Methods for comparing password and generating token
userSchema.methods.comparePassword = async function (loginPassword) {
  const isMatched = await bcrypt.compare(loginPassword, this.password);
  return isMatched;
};

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const payload = {
    _id: user._id,
    email: user.email,
    password: user.password,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
