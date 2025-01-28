import amqp from 'amqplib';

let connection;
let channel;

export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectRabbitMQ, 5000); // Réessaie après 5 secondes
  }
};

export const sendMessage = async (queue, message) => {
  if (!channel) {
    console.error('RabbitMQ channel not initialized');
    return;
  }
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  console.log(`Message sent to queue "${queue}":`, message);
};
