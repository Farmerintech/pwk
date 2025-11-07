import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./UsersModel";

export interface IEvent extends Document {
  id?: any;
  fixedDate:Date;
  tittle:string;
  description:string;
  status:"Announcement Stage" |"Upcoming" | "Event Day" | "Done";
  Attendees:any[];
  RegisteredUsers:mongoose.Types.ObjectId[]
  totalRevenueGenerated:number;
  totalCostSpent:number;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    id:{type:mongoose.Types.ObjectId},
    fixedDate: { type: Date},
    tittle:{type:String, required:true},
    description:{type:String, required:true},
    status:{ type: String, enum: ["Announcement Stage", "Upcoming", "Event Day", "Done"], required: true},
    Attendees:{ type: [mongoose.Types.ObjectId], ref:"Users"},
    RegisteredUsers:[{ type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    totalRevenueGenerated:{ type: Number,},
    totalCostSpent:{ type: Number,},
  },
  { timestamps: true }
);
export const  EventModel = mongoose.models.AdminModel || mongoose.model<IEvent>("Event", EventSchema);



