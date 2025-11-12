"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Vlidator schema
exports.BlogValidator = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
});
