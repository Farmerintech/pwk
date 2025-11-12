"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAnEvent = exports.addEvent = void 0;
const eventValidator_1 = require("../validators/eventValidator");
const EventModel_1 = require("../models/EventModel");
const UsersModel_1 = __importDefault(require("../models/UsersModel"));
//admin add event
const addEvent = async (req, res) => {
    try {
        const { error, value } = eventValidator_1.EventValidator.validate(req.body, { abortEarly: false });
        const { status, tittle, description, fixedDate } = value;
        if (error) {
            return res.status(401).json({
                message: "Validation Error",
                error: error.details.map(detail => detail.message)
            });
        }
        const newEvent = new EventModel_1.EventModel({
            status, tittle, description, fixedDate
        });
        await newEvent.save();
        return res.status(201).json({
            message: "New Event Added Successfully",
            newEvent
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error
        });
    }
};
exports.addEvent = addEvent;
//user register for event.
const registerAnEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.event_id;
        const event = await EventModel_1.EventModel.findById(eventId);
        const { gameInterestedIn } = req.body;
        if (!event) {
            return res.status(404).json({
                message: "Not found",
                error: "The intended event is not found"
            });
        }
        //check if user with such id exist 
        const user = await UsersModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "Not found",
                error: "The intended user is not found"
            });
        }
        //check if the user is not already registered for the event
        const isRegistered = event.RegisteredUsers.find((user) => user?.id?.toString() === userId);
        if (isRegistered) {
            return res.status(401).json({
                message: "",
                error: `"You are already registered for ${event?.tittle} event"`
            });
        }
        const newRegisteredUser = {
            id: userId,
            name: user.name,
            sex: user.gender,
            LGA: user.LGA,
            gameInterestedIn
        };
        // const newEvent = await EventModel.findByIdAndUpdate(eventId, {RegisteredUsers:[...event.RegisteredUsers, userId]});
        //instead of manual handling of the array, let me use mongoose availabe method to update array path directly.
        const newEvent = await EventModel_1.EventModel.findByIdAndUpdate(eventId, { $push: { RegisteredUsers: newRegisteredUser } });
        return res.status(401).json({
            message: `You are Registered for ${event?.tittle} Successfully "`
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "Server Error",
            error: error
        });
    }
};
exports.registerAnEvent = registerAnEvent;
