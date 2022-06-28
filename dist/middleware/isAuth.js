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
exports.isModeratorOrAdmin = exports.isUser = exports.isModerator = exports.isAdmin = void 0;
const models_1 = require("../models");
const common_1 = require("../common");
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.token;
        const checkUser = yield models_1.User.findByPk(id);
        const roles = yield (checkUser === null || checkUser === void 0 ? void 0 : checkUser.getRoles());
        for (let index = 0; index < roles.length; index++) {
            const checkUser = roles[index].name === "admin";
            if (checkUser) {
                return next();
            }
        }
        return common_1.response.errorResponse(res, 403, "Require Admin Role!");
    }
    catch (error) {
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.isAdmin = isAdmin;
const isModerator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.token;
        const checkUser = yield models_1.User.findByPk(id);
        const roles = yield (checkUser === null || checkUser === void 0 ? void 0 : checkUser.getRoles());
        for (let index = 0; index < roles.length; index++) {
            const checkModerator = roles[index].name === "moderator";
            if (checkModerator) {
                return next();
            }
        }
        return common_1.response.errorResponse(res, 403, "Require Moderator Role!");
    }
    catch (error) {
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.isModerator = isModerator;
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.token;
        const checkUser = yield models_1.User.findByPk(id);
        const roles = yield (checkUser === null || checkUser === void 0 ? void 0 : checkUser.getRoles());
        for (let index = 0; index < roles.length; index++) {
            const checkUser = roles[index].name === "user";
            if (checkUser) {
                return next();
            }
        }
        return common_1.response.errorResponse(res, 403, "Require User Role!");
    }
    catch (error) {
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.isUser = isUser;
const isModeratorOrAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.token;
        const checkUser = yield models_1.User.findByPk(id);
        const roles = yield (checkUser === null || checkUser === void 0 ? void 0 : checkUser.getRoles());
        for (let index = 0; index < roles.length; index++) {
            const checkModerator = roles[index].name === "moderator";
            const checkAdmin = roles[index].name === "admin";
            if (checkAdmin) {
                return next();
            }
            if (checkModerator) {
                return next();
            }
        }
        return common_1.response.errorResponse(res, 403, "Require Moderator And Admin Role!");
    }
    catch (error) {
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.isModeratorOrAdmin = isModeratorOrAdmin;
