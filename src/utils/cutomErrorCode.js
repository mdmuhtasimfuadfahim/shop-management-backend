const customErrorCode = {
  "1001": "TokenError",
  "1002": "UnauthorizedError",
  "4000": "CreateUserError",
  "4001": "UserLoginError",
  "4002": "UserLogoutError",
  "4003": "UserRefreshTokenError",
  "4004": "UserForgotPasswordError",
  "4005": "UserResetPasswordError",
  "4006": "SendVerificationEmailError",
  "4007": "VerifyEmailError",
  "4008": "UpdateUserByIdError",
  "4009": "DeleteUserByIdError",
};

module.exports = {
  customErrorCode,
};
