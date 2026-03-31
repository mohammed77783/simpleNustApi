import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Drizzle ORM Example')
    .setDescription('A simple example of using Drizzle ORM with NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
   console.log('Server running on http://localhost:3000');
  console.log('Swagger docs on http://localhost:3000/api');
}
bootstrap();
