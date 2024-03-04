import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        comment: String,
        author: String,
        image: Array,
        userId: String,
        propertyId: String,
        email: String,
        date: String,
    },
    {
        timestamps: true,
    }
);

const commentModel =
    mongoose.models.comments || mongoose.model("comments", commentSchema);

export default commentModel;
