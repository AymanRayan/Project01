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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAvilable = exports.validateQueryData = exports.findImg = exports.createNewImg = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("../api/sharp"));
const path_1 = __importDefault(require("path"));
//decleration of the img paths
const imgPath = path_1.default.resolve(__dirname, '../../../images');
const imgTemp = path_1.default.resolve(__dirname, '../../../images/Temp');
//validate the required data values
function validateQueryData(params) {
    return __awaiter(this, void 0, void 0, function* () {
        let message = '';
        if (!params.height || !params.width || !params.name) {
            message = 'name , width and height is needed data';
            return message;
        }
        const width = parseInt(params.width);
        const height = parseInt(params.height);
        //check that the width and height is absolute positve integer number
        if (Number.isNaN(width) || Number.isNaN(height) || width < 1 || height < 1) {
            message = 'Width and Height must be absolute positive integer number';
            return message;
        }
        return false;
    });
}
exports.validateQueryData = validateQueryData;
//creating new image by resizing fun
function createNewImg(params) {
    return __awaiter(this, void 0, void 0, function* () {
        //check from the data
        if (!params.height || !params.name || !params.width) {
            return false;
        }
        else {
            //new file name
            const newPath = path_1.default.resolve(imgTemp, `${params.name}${params.height}x${params.width}.jpg`);
            //src name
            const oldPath = path_1.default.resolve(imgPath, `${params.name}.jpg`);
            //applying the resizing function
            return yield (0, sharp_1.default)({
                width: parseInt(params.width),
                height: parseInt(params.height),
                from: oldPath,
                to: newPath,
            });
        }
    });
}
exports.createNewImg = createNewImg;
//check that the imgname is avilable
function isAvilable(params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!params.name ||
            params.name.includes('.') ||
            params.name.includes('jpg')) {
            return false;
        }
        else {
            const content = fs_1.default.readdirSync(imgPath);
            return content.includes(`${params.name}.jpg`);
        }
    });
}
exports.isAvilable = isAvilable;
//find the img path
function findImg(params) {
    return __awaiter(this, void 0, void 0, function* () {
        let pathImg;
        if (params.width && params.height) {
            pathImg = path_1.default.resolve(imgTemp, `${params.name}${params.height}x${params.width}.jpg`);
        }
        else {
            pathImg = path_1.default.resolve(imgPath, `${params.name}.jpg`);
        }
        return pathImg;
    });
}
exports.findImg = findImg;
