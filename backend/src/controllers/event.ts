import { Response } from "express";
import { EventValidator } from "../validators/eventValidator";
import  { JwtPayload } from "jsonwebtoken";
import { EventModel } from "../models/EventModel";
import { IUser } from "../models/UsersModel";

interface AuthenticatedRequest extends Request {
  user?: any | JwtPayload;
  params:any
}
//admin add event
export const addEvent = async (req:AuthenticatedRequest, res:Response) =>{
    try {
        const {error, value} = EventValidator.validate(req.body, {abortEarly:false});
        const {status, tittle, description, fixedDate} = value;
        if(error){
            return res.status(401).json({
                message:"Validation Error",
                error:error.details.map(detail=>detail.message)
            })
        }
        const newEvent = new EventModel({
            status, tittle, description, fixedDate
        });
        await newEvent.save();
        return res.status(201).json({
            message:"New Event Added Successfully",
            newEvent
        });
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            error:error
        })
    }
}

//user register for event.
export const registerAnEvent = 
async (req:AuthenticatedRequest, res:Response) =>{
    try {
        const userId = req.user.id;
        const eventId = req.params.event_id;
        const event = await EventModel.findById(eventId);
        if(!event){
            return res.status(404).json({
                message:"Not found",
                error:"The intended event is not found"
            })
        }
        //check if the user is not already registered for the event
        const isRegistered = event.RegisteredUsers.find((user:IUser) => user.toString() === userId);
        if(isRegistered){
            return res.status(401).json({
                message:"",
                error:"You are already registered for this event"
            });
        }
        // const newEvent = await EventModel.findByIdAndUpdate(eventId, {RegisteredUsers:[...event.RegisteredUsers, userId]});
        //instead of manual handling of the array, let me use mongoose availabe method to update array path directly.
        const newEvent = await EventModel.findByIdAndUpdate(eventId, {$push:{RegisteredUsers:userId}});
        return res.status(401).json({
                message:`You are Registered for ${event?.tittle} Successfully "`
            })
    } catch (error) {
        return res.status(401).json({
                message:"Server Error",
                error:error
            }) 
    }
}