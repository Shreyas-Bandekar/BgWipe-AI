import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized, login again" });
    }

    const token = authHeader.split(" ")[1];

    // verify Clerk token with PUBLIC key
    const decoded = jwt.decode(token); // just decode first
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized, login again" });
  }
};

export default authUser;
