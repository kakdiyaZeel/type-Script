"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4000;
const hostname = process.env.HOSTNAME;
app_1.default.listen(PORT, hostname, () => {
    return console.log(`Server running at http://${hostname}:${PORT}/`);
});
