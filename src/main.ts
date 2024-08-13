import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const port: number = parseInt(process.env.PORT) || 3000;
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port);

    console.log(`Server is running on http://localhost:${port || 3000}`);
  } catch (error) {
    console.log(
      `An error has occurred while starting the server: ${error.message}`,
    );
  }
}
bootstrap();
