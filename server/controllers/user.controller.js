import { Webhook } from "svix"
import User from "../models/user.model.js" // Adjust the path if needed

// Api controller function to manage Clerk user with database
// http://localhost:8000/api/user/webhooks

const clerkWebHooks = async (req, res) => {
    try {
        // Create a svix instance with clerk
        const wHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await wHook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { type, data } = JSON.parse(req.body);

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    image: data.image_url
                }

                await User.create(userData);
                res.json({})

                break;
            }

            case "user.updated": {

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    image: data.image_url
                }

                await User.findOneAndUpdate({ clerkId: data.id }, userData);
                res.json({})

                break;
            }

            case "user.deleted": {

                await User.findOneAndDelete({ clerkId: data.id });
                res.json({})

                break;
            }

            default:
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, error: error.message });
    }
}

// Api controller function to get credit data
// http://localhost:8000/api/user/webhooks

const userCredits = async (req, res) => {
    try {
        const clerkId = req.body

        const userData = await User.findOne({ clerkId });
        res.json({ success: true, credits: userData.creditBalance });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, error: error.message });
    }
}


export {
    clerkWebHooks,
    userCredits,
}