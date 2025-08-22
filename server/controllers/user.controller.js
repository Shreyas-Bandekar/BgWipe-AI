import {Webhook} from 'svix'


const clerkWebhooks = async (req, res) => {

    try {
        
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        });

        const [data,type] = req.body;
        
        switch (type) {
            case 'user.created':{
                // Handle user created event
                const userData = {
                    clerkId: data.id,
                    email: data.email,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    image: data.image_url,
                }

                await UserActivation.create(userData);
                res.json({});
                break;
            }
            case 'user.updated':{
                // Handle user updated event
                const userData = {
                    email: data.email,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    image: data.image_url,
                }

                await User.findOneAndUpdate({ clerkId: data.id }, userData);
                res.json({});
                break;
            }
            case 'user.deleted':{
                // Handle user deleted event
                await User.findOneAndDelete({ clerkId: data.id });
                res.json({});
                break;
            }
            default:
                break;
        }


    } catch (error) {
        console.error('Error handling Clerk webhook:', error);
        res.status(500).send('Internal Server Error');
    }

}


export { clerkWebhooks };