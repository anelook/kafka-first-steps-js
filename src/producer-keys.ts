// noinspection TypeScriptValidateTypes

import Kafka from "node-rdkafka";
import dotenv from "dotenv"
import { generateActivity } from "./activity";

dotenv.config();

// create a producer
const producer = new Kafka.Producer({
    'metadata.broker.list': process.env["kafka.uri"],
    'security.protocol': 'ssl',
    'ssl.key.location': process.env["ssl.key.location"],
    'ssl.certificate.location': process.env["ssl.certificate.location"],
    'ssl.ca.location': process.env["ssl.ca.location"],
    'dr_cb': true
});

producer.on('event.log', function (log) {
    console.log(log);
});

//logging all errors
producer.on('event.error', function (err) {
    console.error(err);
});

producer.on('connection.failure', function (err) {
    console.error(err);
});

producer.on('delivery-report', function (err, report) {
    console.log('Message was delivered' + JSON.stringify(report));
});

producer.on('disconnected', function (arg) {
    console.log('producer disconnected. ' + JSON.stringify(arg));
});

producer.on('ready', async () => {
    while(true) {
        const activity = generateActivity();
        producer.produce(
            'customer-activity',  // name of the topic,
            null,  // partition, use null for librdkafka default partitioner
            Buffer.from(JSON.stringify(activity)),  // message to send
            activity.customer,  // optional key
            Date.now()  // optional timestamp
        );
        console.log("activity sent:", activity);
        await new Promise(f => setTimeout(f, 1000));
    }
});

producer.connect({}, (err) => {
    if (err) {
        console.error(err);
    }
});

