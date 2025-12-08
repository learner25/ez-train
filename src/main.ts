import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

 
import { Server } from 'http';

let cachedServer: Server;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'], // optional: smaller logs for serverless
  });

 
  app.enableCors({
    origin: '*',
  });

  
  const config = new DocumentBuilder()
    .setTitle('Japanse language API')
    .setDescription('Language learning API description')
    .setVersion('1.0')
    .addTag('ez-train')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'UUID',
        name: 'Authorization',
        description: 'Enter token here',
        in: 'header',
      },
      'Bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
    customJs: [
      'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
    ],
  });

  await app.init();

 
  return app.getHttpAdapter().getHttpServer();
}

 
export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer.emit('request', req, res);
}
