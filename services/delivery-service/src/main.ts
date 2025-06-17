
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // Enable CORS for HTTP requests
  });
  

  
  // Enable WebSocket support
  app.useWebSocketAdapter(new IoAdapter(app));
  
  // Set global prefix for API routes
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`WebSocket server is running on: ws://localhost:${port}/delivery`);
}
bootstrap();