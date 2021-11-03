"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("./config"));
const create_1 = require("./checker/create");
const express_validator_1 = require("express-validator");
const check_1 = require("./checker/check");
const app = (0, express_1.default)();
const port = config_1.default.port;
const DIST_FOLDER = __dirname + '/../front/dist';
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(DIST_FOLDER));
app.use(express_1.default.static(__dirname + '/../public'));
app.get('/', (req, res) => res.sendFile(DIST_FOLDER + '/index.html'));
app.post('/create-checker', (0, express_validator_1.body)('city').not().isEmpty().trim().isAlphanumeric(), (0, express_validator_1.body)('amount').default(18.2), create_1.handleCreationRequest);
app.post('/check', (0, express_validator_1.body)('checkerId').isString(), (0, express_validator_1.body)('code').isString(), check_1.handleCheckRequest);
app.listen(port, () => {
    console.log(`Discount checker is listening on port ${port}.`);
});
