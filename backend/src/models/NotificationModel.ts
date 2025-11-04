import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  id?: string;
  from: string;
  to: string;
  type: "Event" | "Birthday" | "Blog";
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    id: { type: String, required: true, index: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    type: {
      type: String,
      enum: ["Event", "Birthday", "Blog"],
      required: true,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model<INotification>("NotificationModel", notificationSchema);


export default NotificationModel