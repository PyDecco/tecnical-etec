import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Permite apenas localhost:3001
    methods: 'GET,POST,PUT,DELETE',  // Permite métodos HTTP
    allowedHeaders: 'Content-Type',  // Permite cabeçalhos específicos
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
