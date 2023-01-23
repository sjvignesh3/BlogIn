import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    //Each user can have multiple blogs
    blogs: [{type: mongoose.Types.ObjectId,ref: "Blog", required: true}]
});

export default mongoose.model("User",userSchema);
// users 