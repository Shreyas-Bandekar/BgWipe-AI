import JWT from 'jsonwebtoken'

const authuser = async (req, res, next) => {
    try {
        // Check for X-User-ID header first (direct user ID)
        const userId = req.headers['x-user-id'];
        if (userId) {
            console.log('Using X-User-ID header:', userId);
            req.body.clerkId = userId;
            return next();
        }
        
        // Fall back to token-based authentication
        const token = req.headers.authorization?.split(' ')[1];

        if(!token) {
            return res.status(401).send({status:false, message:"Authentication required"})
        }

        console.log('Received token:', token.substring(0, 10) + '...');  // Log part of token for debugging
        
        // For Clerk tokens, we don't need to verify with JWT_SECRET
        // Instead, we extract the user ID directly from the token claims
        try {
            // First try standard JWT format
            const tokendecode = JWT.decode(token);
            console.log('Token decoded:', tokendecode);  // Log the decoded token
            
            if (!tokendecode) {
                return res.status(401).send({status:false, message:"Could not decode token"});
            }
            
            // Clerk tokens typically have the user ID in the 'sub' field
            req.body.clerkId = tokendecode.sub;
            console.log('Extracted clerkId:', req.body.clerkId);
            
            if (!req.body.clerkId) {
                return res.status(401).send({status:false, message:"No user ID found in token"});
            }
            
            next();
        } catch (decodeError) {
            // If standard decode fails, log the error
            console.error('Token decode error:', decodeError);
            return res.status(401).send({status:false, message:"Invalid token format"});
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send({status:false, message:error.message})
    }
}

export default authuser;