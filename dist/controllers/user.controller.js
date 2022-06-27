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
exports.findUserById = exports.getAllUsers = void 0;
const common_1 = require("../common");
const user_services_1 = require("../services/user-services");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_services_1.getUsers)();
        if (!users.length) {
            return common_1.response.errorResponse(res, 403, "User Not-Found");
        }
        res.cookie("USERS", { user: users }, {
            httpOnly: true,
            maxAge: 900000,
        });
        return common_1.response.successResponse(res, "List Of Users", users);
    }
    catch (error) {
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.getAllUsers = getAllUsers;
const findUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.token;
        const user = yield (0, user_services_1.findUser)(id);
        if (!user) {
            return common_1.response.errorResponse(res, 403, "Invalid Id");
        }
        return common_1.response.successResponse(res, "Verified User", user);
    }
    catch (error) {
        return common_1.response.errorResponse(res, error.message, error);
    }
});
exports.findUserById = findUserById;
