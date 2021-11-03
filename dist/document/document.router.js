"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentRouter = void 0;
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../config"));
exports.documentRouter = (0, express_1.Router)();
const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
const uploadDirectory = (0, path_1.resolve)(process.cwd(), "data");
exports.documentRouter.post("/", (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: "Too many documents created from this IP, please try again later.",
}), (req, res) => {
    const content = req.body.content;
    if (content.length > config_1.default.documentSettings.maxSize) {
        return res.status(422).json({ error: "Content is too long" });
    }
    if (content.length < 1) {
        return res.status(422).json({ error: "Content is empty" });
    }
    const key = (0, uuid_1.v4)();
    (0, fs_1.writeFileSync)((0, path_1.resolve)(uploadDirectory, `${key}`), content);
    return res.status(201).json({ key });
});
exports.documentRouter.get("/:id", (req, res) => {
    if (!regexExp.test(req.params.id))
        return res.status(422).json({ error: "ID is invalid" });
    const path = (0, path_1.resolve)(uploadDirectory, req.params.id);
    if (!(0, fs_1.existsSync)(path))
        return res.status(404).json({ error: "Document not found" });
    const content = (0, fs_1.readFileSync)(path, "utf-8");
    return res.json({ content });
});
