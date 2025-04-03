// Ref: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-node-get-started-send?tabs=connection-string%2Croles-azure-portal#send-events

import { EventHubProducerClient } from '@azure/event-hubs';

const main = async () => {
  const connectionString = process.env.EVENT_HUB_CONNECTION_STRING;
  const eventHubName = process.env.EVENT_HUB_NAME;
  const body = {
    id: 1,
    message: 'Hello, Event Hub!',
  };

  if (!connectionString || !eventHubName) {
    console.error('Missing environment variables');
    return;
  }

  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(connectionString, eventHubName);

  try {
    // Prepare a batch of events.
    const batch = await producer.createBatch();

    batch.tryAdd({
      body,
    });

    // Send the batch to the event hub.
    await producer.sendBatch(batch);
    console.debug('A batch of events have been sent to the event hub');
  } catch (err) {
    console.error('Error when sending message to Event Hub', err);
  } finally {
    // Close the producer client.
    await producer.close();
  }
};

void main();
