import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {TelegramAuthGuard} from "./modules/telegram/guards/telegram-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	// Swagger API
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Orders mini-app backend')
		.setDescription('The 1Gcompany telegram mini-app backend API')
		.setVersion('1.0')
		.build();
	SwaggerModule.setup('api', app, () => SwaggerModule.createDocument(app, swaggerConfig));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();