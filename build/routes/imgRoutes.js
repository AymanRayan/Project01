"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Resizing_1 = require("./api/Resizing");
const imgs = (0, express_1.Router)();
imgs.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield (0, Resizing_1.validateQueryData)(req.query);
    if (message) {
        res.send(message);
    }
    const isAccepted = yield (0, Resizing_1.isAvilable)(req.query);
    if (isAccepted) {
        yield (0, Resizing_1.createNewImg)(req.query);
        const location = yield (0, Resizing_1.findImg)(req.query);
        if (location) {
            res.sendFile(location);
        }
        else {
            res.send('There is an error in Retriving data');
        }
    }
    else {
        res.send("There is no file for this name pick one from IMAGES folder or put your img there then use the name without it's extention ... Try again");
    }
}));
exports.default = imgs;
