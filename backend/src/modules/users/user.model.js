import mongoose, { Schema } from "mongoose";
import { compareHash, hashValue } from "../../core/security/hash.security.js";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    username: {
      type: String,
      required: "Username is required",
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      trim: true,
      lowercase: true,
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: "Password is required",
      trim: true,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashPassword = await hashValue(this.password);
  this.password = hashPassword;
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  const isValidPassword = await compareHash(password, this.password);
  return isValidPassword;
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
