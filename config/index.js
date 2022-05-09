module.exports = {
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 9000,
  JWTSECRET:
    process.env.JWT_SECRET ||
    "eyJzdWJqZWN0IjoyLCJ1c2VybmFtZ-SI6ImZyaXR6Z3QiLCJp-YXQiOjE2NTIxMjExNTA",
};
