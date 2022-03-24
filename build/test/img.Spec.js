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
const Resizing_1 = require("../routes/api/Resizing");
describe('test resizing function', () => {
    it('invalid height value', () => __awaiter(void 0, void 0, void 0, function* () {
        const err = yield (0, Resizing_1.createNewImg)({
            name: 'x',
            width: '100',
            height: '-100',
        });
        expect(err).not.toBeNull();
    }));
});
