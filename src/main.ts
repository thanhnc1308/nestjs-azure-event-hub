import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventHubConsumer } from './event-hub/services/event-hub.consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const eventHubListener = app.get(EventHubConsumer);
  await eventHubListener.subscribeToEvents();
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
