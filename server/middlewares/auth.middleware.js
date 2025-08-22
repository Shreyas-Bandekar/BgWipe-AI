import JWT from 'jsonwebtoken'

const authuser = async (req,res)=> {
    try {
        const token = req.headers

        if(!token) {
            return res.status(401).send({status:false, message:"Token is required"})
        }

        const tokendecode = JWT.verify(token)
        req.body.clerkId = tokendecode.id
        next()

    } catch (error) {
        console.log(error.message);
        res.status(500).send({status:false, message:error.message})
    }
}

export default authuser;