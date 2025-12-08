import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthGuard } from 'src/auth/auth.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
        description: 'Enter  token',
        in: 'header',
      },
      'Bearer', // This is the security name used in @ApiSecurity()
    )
    .addSecurity('Bearer', {
      type: 'http',
      scheme: 'bearer',
  })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
