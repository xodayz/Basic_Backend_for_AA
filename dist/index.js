"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// endpoint
app.get('/users', (request, response) => {
    response.status(400).json(request.headers);
});
app.get('/customers', function (request, response) {
    response.send('Hello World');
});
app.get('/invoices', function (request, response) {
    response.send('Hello World');
});
app.listen(3000, () => console.log('Server running at port 3000'));
//# sourceMappingURL=index.js.map