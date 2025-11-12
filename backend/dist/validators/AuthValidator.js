"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidator = exports.loginValidator = exports.AuthValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Vlidator schema
exports.AuthValidator = joi_1.default.object({
    name: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    LGA: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'yahoo'] } }).required(),
    phoneNumber: joi_1.default.string().max(11).required(),
    preferedName: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    DOB: joi_1.default.date().required(),
});
exports.loginValidator = joi_1.default.object({
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'yahoo'] } }).required(),
    password: joi_1.default.string().required(),
});
exports.resetPasswordValidator = joi_1.default.object({
    oldPsw: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    newPsw: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
