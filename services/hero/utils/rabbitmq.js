import amqp from 'amqplib';

let connection;
let channel;

// Connexion à RabbitMQ
export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    setTimeout(connectRabbitMQ, 5000); // Réessayer après 5 secondes
  }
};

// Fonction pour envoyer un message à une file d'attente
export const sendMessage = async (queue, message) => {
  if (!channel) {
    console.error('RabbitMQ channel not initialized');
    return;
  }
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  console.log(`Message sent to queue "${queue}":`, message);
};

// Fonction pour consommer les messages d'une file d'attente
export const consumeMessage = async (queue, onMessage) => {
  if (!channel) {
    console.error('RabbitMQ channel not initialized');
    return;
  }
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      console.log(`Message received from queue "${queue}":`, message);
      onMessage(message);
      channel.ack(msg);
    }
  });
};
