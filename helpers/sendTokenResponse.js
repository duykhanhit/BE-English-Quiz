module.exports = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  
  res.status(statusCode).json({
    success: true,
    token,
  });
};
