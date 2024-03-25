"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const LOG_STYLES = Object.freeze({
    SERVER_ON: chalk_1.default.italic.magentaBright,
    SERVER_OFF: chalk_1.default.rgb(230, 14, 43),
    REQ_RECEIVED: chalk_1.default.italic.rgb(35, 222, 167),
    NEW_USER: chalk_1.default.rgb(199, 106, 56),
    LOGIN_USER: chalk_1.default.rgb(148, 16, 73),
    VALID_TOKEN: chalk_1.default.rgb(100, 204, 166)
});
exports.default = LOG_STYLES;
