import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle("Capstone NodeJS AirBnB")
  .setDescription("This is list API of AirBnB Project")
  .setVersion("1.0.0")
  .build()

  const swagger = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger",app,swagger)

  await app.listen(3000);
}
bootstrap();

// import { PrismaClient } from '@prisma/client'
//prisma = new PrismaClient()

