import { Injectable } from '@nestjs/common';
import {
  EventHubConsumerClient,
  SubscriptionEventHandlers,
} from '@azure/event-hubs';

@Injectable()
export class EventHubConsumer {
  private readonly eventHubConnectionString =
    process.env.EVENT_HUB_CONNECTION_STRING;
  private readonly eventHubName = process.env.EVENT_HUB_NAME;
  private readonly eventHubConsumerGroup = process.env.EVENT_HUB_CONSUMER_GROUP;

  async subscribeToEvents() {
    if (
      !this.eventHubConnectionString ||
      !this.eventHubName ||
      !this.eventHubConsumerGroup
    ) {
      console.error('Missing environment variables');
      return;
    }

    const consumerClient = new EventHubConsumerClient(
      this.eventHubConsumerGroup,
      this.eventHubConnectionString,
      this.eventHubName,
    );

    console.info(`Listening to Event Hub ${this.eventHubName}`);

    const subscriptionOptions: SubscriptionEventHandlers = {
      processEvents: async (events: any[]) => {
        console.info('Received events:', events);
        for (const event of events) {
          await this.processEvent(event.body);
        }
      },
      processError: async (err) => {
        console.error('Error occurred:', err);
      },
    };

    const subscription = consumerClient.subscribe(subscriptionOptions);

    // Wait for the subscription to be closed
    await subscription.close();
  }

  async processEvent(eventBody: any) {
    console.log('processEvent eventBody', eventBody);
  }
}
