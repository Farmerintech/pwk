"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Vlidator schema
exports.EventValidator = joi_1.default.object({
    tittle: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    Attendees: joi_1.default.string(),
    RegisteredUsers: joi_1.default.string(),
    totalRevenueGenerated: joi_1.default.number(),
    totalCostSpent: joi_1.default.number(),
    fixedDate: joi_1.default.number(),
});
