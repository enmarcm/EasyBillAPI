import mongoose from 'mongoose';
import messages from '../json/messages.json';

/**
 * Establishes a connection to the MongoDB database.
 * @returns {Promise<{ success: boolean } | { error: any }>} A promise that resolves to an object with either a success or error property.
 */
const connectionDB = async (): Promise<Object> => {
    try {
       if (!process.env.MONGODB_URI) throw new Error(messages.error.MongoURIUndefined.description);

        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB! 🚀`);
        return { success: true }
    } catch (e: any) {
        console.error(`Error connecting to MongoDB: ${e.message}`);
        return { error: messages.error.ConnectionDBError.description }
    }
}

export default connectionDB;