export default {
  secret: process.env.JWT_SECRET || "",
  expiration: "2h",
};
