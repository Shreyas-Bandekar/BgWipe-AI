import { messageInRaw } from "svix";
import jwt from jsonwebtoken

const authUser = async (req, res, next) => {
    try {
        const token = req.headers
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized login again" });
        }

        const token_decode = jwt.decode(token);
        req.body.clerkId = token_decode.clerkId;
        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).json({ success: false, error: "Unauthorized" });
    }
}

export default authUser;