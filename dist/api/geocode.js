"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocode = void 0;
const got_1 = __importDefault(require("got"));
const geocode = (search) => {
    return (0, got_1.default)(`https://geocode.xyz/${search}`, {
        searchParams: {
            json: 1,
        },
        responseType: 'json',
    }).then((response) => response.body);
};
exports.geocode = geocode;
