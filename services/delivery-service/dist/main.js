"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true, // Enable CORS for HTTP requests
    });
    // Enable WebSocket support
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    // Set global prefix for API routes
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`WebSocket server is running on: ws://localhost:${port}/delivery`);
}
bootstrap();
