import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: { // Each blog should have only one parent User
        type: mongoose.Types.ObjectId,
        ref: "User", //collection in Mongo
        required: true
    }
});

export default mongoose.model("Blog",blogSchema);