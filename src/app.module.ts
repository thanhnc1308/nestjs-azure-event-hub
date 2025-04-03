import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { EventHubModule } from './event-hub/event-hub.module';

@Module({
  imports: [ConfigModule.forRoot(), EventHubModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
