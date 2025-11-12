"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// User Schema
const UserSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.default.Types.ObjectId },
    uniqueId: { type: String, required: true, },
    name: { type: String, required: true, },
    gender: { type: String, required: true, },
    DOB: { type: String, required: true },
    email: { type: String, unique: true, },
    LGA: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferedName: { type: String, required: true },
    profilePicture: { type: String },
    role: { type: String, default: "user" },
    status: { type: String, default: "Active" }
}, { timestamps: true });
exports.default = mongoose_1.default.models.UserModel || mongoose_1.default.model("User", UserSchema);
const AdminSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: "admin" },
    status: { type: String, default: "Active" }
}, { timestamps: true });
exports.AdminModel = mongoose_1.default.models.AdminModel || mongoose_1.default.model("Admin", AdminSchema);
