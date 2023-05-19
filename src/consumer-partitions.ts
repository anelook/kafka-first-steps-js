import dotenv from "dotenv";

const Kafka = require('node-rdkafka');
dotenv.config();

const stream = new Kafka.createReadStream({
    'metadata.broker.list': process.env["kafka.uri"],
    'group.id': 'first-group',
    'security.protocol': 'ssl',
    'ssl.key.location': process.env["ssl.key.location"],
    'ssl.certificate.location': process.env["ssl.certificate.location"],
    'ssl.ca.location': process.env["ssl.ca.location"]
}, {'auto.offset.reset': 'earliest'}, {'topics': ['customer-activity']});

stream.on('data', (chunk: any) => {
    // process message
    console.log('received from PARTITION %d MESSAGE: %s', chunk.partition, chunk.value.toString());
});