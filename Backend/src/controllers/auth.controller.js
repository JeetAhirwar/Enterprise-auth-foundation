const authService = require("../services/auth.service");
const Response = require("../utils/Response");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const API_MESSAGES = require("../constants/apiMessages");
const cookieOptions = require("../config/cookie");

const register = asyncHandler(async (req, res) =>
{
  const result = await authService.registerUser(req.body);

  return Response.created(
    res,
    API_MESSAGES.REGISTER_SUCCESS,
    {
      user: result.user,
      accessToken: result.accessToken,
      emailVerificationToken:
        result.emailVerificationToken,
    }
  );
});

const login = asyncHandler(async (req, res) =>
{
  const result = await authService.loginUser(req.body);

  return Response.success(
    res,
    API_MESSAGES.LOGIN_SUCCESS,
    {
      user: result.user,
      accessToken: result.accessToken,
    }
  );
});

const logout = asyncHandler(async (req, res) =>
{
  await authService.logoutUser(req.user._id);

  res.clearCookie("refreshToken", cookieOptions);

  return Response.success(
    res,
    API_MESSAGES.LOGOUT_SUCCESS
  );
});

const refreshToken = asyncHandler(async (req, res) =>
{
  const token = req.cookies?.refreshToken;

  const result = await authService.refreshAccessToken(token);

  res.cookie(
    "refreshToken",
    result.refreshToken,
    cookieOptions
  );

  return Response.success(
    res,
    API_MESSAGES.TOKEN_REFRESH_SUCCESS,
    {
      accessToken: result.accessToken,
    }
  );
});

const getCurrentUser = asyncHandler(async (req, res) =>
{
  return Response.success(
    res,
    API_MESSAGES.CURRENT_USER_SUCCESS,
    {
      user: req.user,
    }
  );
});

const changePassword = asyncHandler(async (req, res) =>
{
  const { oldPassword, newPassword } = req.body;

  await authService.changePassword(req.user._id, oldPassword, newPassword);

  res.clearCookie(
    "refreshToken",
    cookieOptions
  );

  return Response.success(
    res,
    API_MESSAGES.PASSWORD_CHANGED_SUCCESS
  );
});

const forgotPassword = asyncHandler(async (req, res) =>
{
  const resetToken = await authService.forgotPassword(req.body.email);

  return Response.success(
    res,
    API_MESSAGES.PASSWORD_RESET_LINK_SENT,
    {
      resetToken:
        process.env.NODE_ENV === "development"
          ? resetToken
          : undefined,
    }
  );
});

const resetPassword = asyncHandler(async (req, res) =>
{
  await authService.resetPassword(req.params.token, req.body.newPassword);

  res.clearCookie(
    "refreshToken",
    cookieOptions
  );

  return Response.success(
    res,
    API_MESSAGES.PASSWORD_RESET_SUCCESS
  );
});

const verifyEmail = asyncHandler(async (req, res) =>
{
  await authService.verifyEmail(req.params.token);

  return Response.success(
    res,
    API_MESSAGES.EMAIL_VERIFIED_SUCCESS
  );
});

const resendVerificationEmail = asyncHandler(async (req, res) =>
{
  const emailVerificationToken =
    await authService.resendVerificationEmail(req.body.email);

  return Response.success(
    res,
    API_MESSAGES.EMAIL_VERIFICATION_SENT,
    {
      emailVerificationToken:
        process.env.NODE_ENV === "development"
          ? emailVerificationToken
          : undefined,
    }
  );
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
};