const customErrorCode = {
  "0": "KafkaValidaitonError",

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

  "5001": "AddProductError",
  "5002": "GetProcductsError",
  "5003": "GetProcductBySKUError",
  "5004": "UpdateProcductBySKUError",
  "5005": "DeleteProcductBySKUError",

  "6001": "GetInventoriesError",
  "6002": "GetInventoryByIDError",
  "6003": "UpdateInventoryByIdError",

  "7001": "GetInvoicesError",
  "7002": "GetInvoiceByTypeError",

  "8001": "AddOrderError",
  "8002": "GetOrdersError",
  "8003": "GetOrderByIDError",
};

module.exports = {
  customErrorCode,
};
