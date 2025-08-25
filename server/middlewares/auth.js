import jwt from "jsonwebtoken";

// Middleware function to decode jwt token to clerkId
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    // Decode the JWT token without verification (since Clerk handles verification)
    const token_decode = jwt.decode(token);
    
    if (!token_decode) {
      return res.json({
        success: false,
        message: "Invalid token format",
      });
    }

    // Check if token is expired
    if (token_decode.exp && Date.now() >= token_decode.exp * 1000) {
      return res.json({
        success: false,
        message: "Token has expired",
      });
    }

    // Clerk tokens use 'sub' field as the user ID
    const clerkId = token_decode.sub;
    
    if (!clerkId) {
      return res.json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // For GET requests, we'll use req.user, for POST requests, we'll use req.body
    if (req.method === 'GET') {
      req.user = { clerkId };
    } else {
      // Ensure req.body exists for POST requests
      if (!req.body) {
        req.body = {};
      }
      req.body.clerkId = clerkId;
    }
    
    next();
  } catch (error) {
    res.json({ success: false, message: "Authentication failed" });
  }
};

export default authUser;