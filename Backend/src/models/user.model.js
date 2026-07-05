const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ROLES = require("../constants/roles");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [60, "Full name cannot exceed 60 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      // unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
      select: false,
    },

    emailVerificationExpires: {
      type: Date,
      select: false,
    },

    emailVerifiedAt: {
      type: Date,
      default: null,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      select: false,
    },

    passwordChangedAt: {
      type: Date,
      default: null,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    accountStatus: {
      type: String,
      enum: ["ACTIVE", "BLOCKED", "SUSPENDED", "PENDING_VERIFICATION"],
      default: "PENDING_VERIFICATION",
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

    loginCount: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function ()
{
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (enteredPassword)
{
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ accountStatus: 1 });
userSchema.index({ isDeleted: 1 });


const User = mongoose.model("User", userSchema);

module.exports = User;