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
exports.getUsers = exports.findUser = void 0;
const models_1 = require("../models");
const findUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: [
            {
                model: models_1.Role,
                as: "roles",
                attributes: ["name"],
            },
        ],
    });
    return user;
});
exports.findUser = findUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.findAll({
        include: [{ model: models_1.Role, as: "roles", attributes: ["name"] }],
    });
    return users;
});
exports.getUsers = getUsers;
