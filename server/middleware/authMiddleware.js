import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode; // adds user to ID to request
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authenticate;
