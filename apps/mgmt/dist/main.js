"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require('dotenv').config();
const API_PORT = process.env.API_PORT;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('mgmt/v1');
    await app.listen(Number(API_PORT));
}
bootstrap();
//# sourceMappingURL=main.js.map