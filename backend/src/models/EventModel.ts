import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./UsersModel";

export interface IEvent extends Document {
  id?: any;
  fixedDate:Date;
  status:"Announcement Stage" |"Upcoming" | "Event Day" | "Done";
  Attendees:any[];
  RegisteredUsers:any[]
  totalRevenueGenerated:number;
  totalCostSpent:number;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    id:{type:mongoose.Types.ObjectId},
    fixedDate: { type: Date},
    status:{ type: String, enum: ["Foot ball", "Table tennis", "Ludo", "Scrabble"], required: true},
    Attendees:{ type: [mongoose.Types.ObjectId], ref:"Users"},
    RegisteredUsers:{ type: [mongoose.Types.ObjectId], ref:"Users"},
    totalRevenueGenerated:{ type: Number,},
    totalCostSpent:{ type: Number,},
  },
  { timestamps: true }
);
export const  EventModel = mongoose.models.AdminModel || mongoose.model<IEvent>("Event", EventSchema);



