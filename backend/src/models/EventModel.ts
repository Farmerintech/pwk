import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./UsersModel";


export interface IEventUser{
  id:mongoose.Types.ObjectId;
  name:string;
  gameInterestedIn:string;
}
export interface IEvent extends Document {
  id?: any;
  fixedDate:Date;
  tittle:string;
  description:string;
  status:"Announcement Stage" |"Upcoming" | "Event Day" | "Done";
  Attendees:any[];
  RegisteredUsers:IEventUser[]
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
    RegisteredUsers:[
      {
        id:mongoose.Types.ObjectId,
        name:{type:String},
        gameInterestedIn:{type:String, enum:["Foot ball", "Table tennis", "Scrabble", "Ludo", "Special Team"]}
      }
    ],
    totalRevenueGenerated:{ type: Number,},
    totalCostSpent:{ type: Number,},
  },
  { timestamps: true }
);
export const  EventModel = mongoose.models.AdminModel || mongoose.model<IEvent>("Event", EventSchema);



