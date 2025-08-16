import jwt from jsonwebtoken

const authUser= async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ success: false, error: "Unauthorized" });
    }
}

export default authUser;