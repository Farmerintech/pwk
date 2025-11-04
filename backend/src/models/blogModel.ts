import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  id?: any;
  title:Date;
  content:string;
  image:string;
  postedBy:string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    id:{type:mongoose.Types.ObjectId},
    title: { type: Date},
    content:{ type: String, required: true},
    image:{ type: String,},
    postedBy:{ type: String,},
  },
  { timestamps: true }
);
export const  BlogModel = mongoose.models.AdminModel || mongoose.model<IBlog>("Blog", blogSchema);



