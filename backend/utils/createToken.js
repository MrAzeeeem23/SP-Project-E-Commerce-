import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: false, // Prevents JavaScript access to the cookie
    secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
    sameSite: "None", // Adjust based on your needs, 'None' allows cross-site cookies
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration set to 30 days
  });

  return token;
};

export default generateToken;
