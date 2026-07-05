const userRepository = require("../repositories/user.repository");
const Errors = require("../utils/Errors");
const API_MESSAGES = require("../constants/apiMessages");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/token");

const {
  generateRandomToken,
  hashToken
} = require("../utils/crypto");

const sanitizeUser = (user) =>
{
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.refreshToken;

  return userObject;
};

const registerUser = async ({ fullName, email, password, role }) =>
{
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser)
  {
    throw Errors.emailAlreadyExists();
  }

  const user = await userRepository.create({
    fullName,
    email,
    password,
    role,
    accountStatus: "PENDING_VERIFICATION",
  });

  const emailVerificationToken = generateRandomToken();
  const hashedEmailVerificationToken = hashToken(emailVerificationToken);

  user.emailVerificationToken = hashedEmailVerificationToken;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await userRepository.save(user, { validateBeforeSave: false });

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
    emailVerificationToken:
      process.env.NODE_ENV === "development" ? emailVerificationToken : undefined,
  };
};

const loginUser = async ({ email, password }) =>
{
  const user = await userRepository.findByEmail(
    email,
    "+password +refreshToken"
  );

  if (!user)
  {
    throw Errors.invalidCredentials();
  }

  if (user.isBlocked)
  {
    throw Errors.accountBlocked();
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid)
  {
    throw Errors.invalidCredentials();
  }

  user.lastLoginAt = new Date();
  user.loginCount += 1;

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await userRepository.save(user, { validateBeforeSave: false });

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

const logoutUser = async (userId) =>
{
  const user = await userRepository.findById(userId, "+refreshToken");

  if (!user)
  {
    throw Errors.userNotFound();
  }

  user.refreshToken = null;
  await userRepository.save(user, { validateBeforeSave: false });

  return true;
};

const refreshAccessToken = async (refreshToken) =>
{
  if (!refreshToken)
  {
    throw Errors.refreshTokenRequired();
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await userRepository.findById(decoded.id, "+refreshToken");

  if (!user || user.refreshToken !== refreshToken)
  {
    throw Errors.invalidRefreshToken();
  }

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshToken = newRefreshToken;
  await userRepository.save(user, { validateBeforeSave: false });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

const changePassword = async (userId, oldPassword, newPassword) =>
{
  const user = await userRepository.findById(userId, "+password +refreshToken");

  if (!user)
  {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, API_MESSAGES.USER_NOT_FOUND);
  }

  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid)
  {
    throw Errors.oldPasswordIncorrect();
  }

  user.password = newPassword;
  user.refreshToken = null;
  user.passwordChangedAt = new Date();

  await userRepository.save(user);

  return true;
};

const forgotPassword = async (email) =>
{
  const user = await userRepository.findByEmail(email);

  if (!user)
  {
    return null;
  }

  const resetToken = generateRandomToken();
  const hashedToken = hashToken(resetToken);

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  await userRepository.save(user, { validateBeforeSave: false });

  return resetToken;
};

const resetPassword = async (token, newPassword) =>
{
  const hashedToken = hashToken(token);

  const user = await userRepository.findOne(
    {
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    },
    "+passwordResetToken +passwordResetExpires +refreshToken"
  );

  if (!user)
  {
    throw Errors.invalidResetToken();
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.refreshToken = null;
  user.passwordChangedAt = new Date();

  await userRepository.save(user);

  return true;
};

const verifyEmail = async (token) =>
{
  const hashedToken = hashToken(token);

  const user = await userRepository.findOne(
    {
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: new Date() },
    },
    "+emailVerificationToken +emailVerificationExpires"
  );

  if (!user)
  {
    throw Errors.invalidEmailVerificationToken();
  }

  user.accountStatus = "ACTIVE";
  user.isEmailVerified = true;
  user.emailVerifiedAt = new Date();
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await userRepository.save(user, { validateBeforeSave: false });

  return true;
};

const resendVerificationEmail = async (email) =>
{
  const user = await userRepository.findByEmail(
    email,
    "+emailVerificationToken +emailVerificationExpires"
  );

  if (!user)
  {
    return null;
  }

  if (user.isEmailVerified)
  {
    throw Errors.emailAlreadyVerified();
  }

  const emailVerificationToken = generateRandomToken();
  const hashedEmailVerificationToken = hashToken(emailVerificationToken);

  user.emailVerificationToken = hashedEmailVerificationToken;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await userRepository.save(user, { validateBeforeSave: false });

  return emailVerificationToken;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
};