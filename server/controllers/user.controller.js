import {Webhook} from 'svix'
import User from '../models/user.model.js';

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

                await User.create(userData);
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

const usercredits = async (req, res) => {

    try {
        const clerkId = req.body.clerkId;
        console.log('Looking up user with clerkId:', clerkId);
        console.log('Request body:', req.body);
        console.log('Request headers:', req.headers);
        
        if (!clerkId) {
            console.error('No clerkId provided in request');
            return res.status(400).json({ message: 'No user ID provided' });
        }
        
        // Try to find the user
        let userData = await User.findOne({ clerkId });
        console.log('User data found:', userData ? 'Yes' : 'No');
        
        // If user not found, create a new user with default credits
        if (!userData) {
            console.log('Creating new user with clerkId:', clerkId);
            userData = await User.create({
                clerkId,
                creditBalance: 10 // Default credits
            });
            console.log('New user created:', userData ? 'Yes' : 'No');
        }
        
        if (!userData) {
            return res.status(500).json({ message: 'Failed to find or create user' });
        }
        
        console.log('Returning credit balance:', userData.creditBalance);
        res.json({ creditBalance: userData.creditBalance || 0 });

    } catch (error) {
        console.error('Error in usercredits:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

}

export { clerkWebhooks, usercredits };