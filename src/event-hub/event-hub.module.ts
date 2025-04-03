import { Module } from '@nestjs/common';
import { EventHubConsumer } from './services/event-hub.consumer';

@Module({
  providers: [EventHubConsumer],
})
export class EventHubModule {}
