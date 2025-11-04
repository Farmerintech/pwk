import mongoose, { Document, Schema } from "mongoose";

// User Interface
export interface IUser extends Document {
  id?:any
  uniqueId:string;
  name: string;
  gender:string;
  email: string;
  DOB:string;
  LGA:string;
  phoneNumber:string;
  gameOfChoice: "Foot ball" | "Table tennis" |"Ludo" |"Scrabble";
  preferedName?: Date;
  profilePicture:string
  role?:string;
  status?:"Active" |"Suspended"
  password:string;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const UserSchema = new Schema<IUser>(
  {
    id:{type: mongoose.Types.ObjectId },
    uniqueId:{type: String, required: true,  },
    name: { type: String, required: true,  },
    gender:{type: String, required: true,  },
    DOB:{ type: String, required: true },
    email: { type: String, unique: true ,},
    LGA: { type: String, required: true },
    phoneNumber:{ type: String, required: true, unique: true },
    gameOfChoice: { type: String, enum: ["Foot ball", "Table tennis", "Ludo", "Scrabble"], required: true },   
    password:{ type: String, required: true },
    preferedName:{type: String, required: true},
    profilePicture:{type: String},
    role:{type: String, default:"user"},
    status:{type:String, default:"Active"}
  },
  { timestamps: true }
);

export default mongoose.models.UserModel || mongoose.model<IUser>("User", UserSchema);

export interface IAdmin extends Document {
  id:string;
  email?: string;
  password:string;
  role?:string;
  name?:string;
  status?:"Active" |"Suspended"
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, unique: true ,},
    password:{ type: String, required: true },
    name:{ type: String},
    role:{ type: String, default:"admin"},
    status:{type:String, default:"Active"}
  },
  { timestamps: true }
);
export const  AdminModel = mongoose.models.AdminModel || mongoose.model<IAdmin>("Admin", AdminSchema);



