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
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, message, data) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ status: true, message, data });
});
exports.successResponse = successResponse;
const errorResponse = (res, code, message, error) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(code).json({ status: false, message: message, error });
});
exports.errorResponse = errorResponse;
