import jwt from "jsonwebtoken";

// Middleware function to decode jwt token to clerkId
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    console.log("Received token:", token ? "Token present" : "No token");

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    // Decode the JWT token without verification (since Clerk handles verification)
    const token_decode = jwt.decode(token);
    console.log("Decoded token payload:", {
      sub: token_decode?.sub,
      exp: token_decode?.exp,
      iat: token_decode?.iat,
      iss: token_decode?.iss
    });
    
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

    console.log("Extracted clerkId:", clerkId);

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
    console.log("Auth middleware error:", error.message);
    res.json({ success: false, message: "Authentication failed: " + error.message });
  }
};

export default authUser;