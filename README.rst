Hands-on material for session "Apache Kafka simply explained" (Typescript version)
==================================================================================

Hello all! This repository contains a set of short exercises to get familiar with Apache Kafka. You'll need to do a couple of setup steps and then you can run examples of producers and consumers that I've preapared for you.

Preparation steps
------------------

1. You'll need an Apache Kafka cluster. Apache Kafka is an open source platform, so you can either `set it up and run from its source code <https://kafka.apache.org/quickstart#quickstart_download>`_ or use a fully managed option, for  this experiments you can use a free trial of `Aiven for Apache Kafka <https://aiven.io/kafka>`_ (Disclaimer for transparency - I work at Aiven 🙂). I'll be using the latter option.

2. Clone this repository and install the dependencies with ``npm install``.

3. To connect to the remote Apache Kafka cluster we need to set up SSL configuration. Download the certificates ``ca.pem``, ``cervice.cert`` and ``cervice.key`` and add them to ``certificates`` folder.

4. Copy .env.example, rename to .env and update it with information URI of your Apache Kafka cluster.

5. In your cluster create a topic with the name *customer-activity* that contains 3 partitions, for example for Aiven's managed version you can use the UI and create a topic `directly from the console <https://developer.aiven.io/docs/products/kafka/howto/create-topic.html>`_.

Now you're ready for demo exercises. In these demos we'll focus on a single topic that contains events based on customer activity in an online shop.

Demo # 1: create a producer and a consumer
-----------------------------------------------
In this demo we'll look at a simple producer. This producer will send messages to the Kafka cluster; and a simple consumer will read messages and print out their content.

1. Open the file ``src/producer.ts`` - this is an example of a very simple producer. It generates a random message every second and sends it into the cluster. Run it by calling ``npm run produce`` in the terminal
2. If the configuration is set up correctly, you'll see output similar to this:

.. code::

     npm run produce

    > kafka-first-steps@1.0.0 produce
    > npm run build && node build/producer.js
    
    
    > kafka-first-steps@1.0.0 build
    > rimraf ./build && tsc
    
    activity sent: {"operation":"searched 🔍","customer":"Chief Bogo 🐃","product":"Pineapple pizza 🍕"}


3. While producer creates new messages, open file ``src/consumer.ts`` and run it with ``npm run consumer``. Consumer will connect to the cluster and read messages added by producer. You will see detailed information about connection to the cluster and once the connection is established the received messages:

.. code::

    > kafka-first-steps@1.0.0 consume
    > npm run build && node build/consumer.js
    
    
    > kafka-first-steps@1.0.0 build
    > rimraf ./build && tsc
    
    received {"operation":"searched 🔍","customer":"Nick Wilde 🦊","product":"Carrot 🥕"}
    received {"operation":"searched 🔍","customer":"Nick Wilde 🦊","product":"Ice cream 🍨"}

3. Observe the results. Once you're done, terminate the consumer, but keep running the producer, we'll need it for the next step.

Demo # 2: observe how messages are spreaded across partitions
--------------------------------------------------------------------
In this demo we'll look at partitions and offsets.

1. You should have the producer ``src/producer.ts`` already running.
2. Run ``consume-show-partitions``, to start the consumer that will also output the information about the partitions from where the code is coming from.
3. Also, for one selected consumer (Judy Hopps) run ``consume-only-judy`` which outputs results for a single customer. You can see that currently the messages that are related to a single customer are spread across all partitions.
4. Terminate the producers and consumers that are running.

Demo # 3: add keys to messages
------------------------------------
When looking at the consumer output you can see that messages are spread across partitions in some random way.
It is important to understand that Apache Kafka guarantees order only within a partition. This means that if we want to preserve message orders coming from our customers we need to write all messages related to a single customer into the same partition.
This can be done by assigning keys to the messages. All messages with the same key will be added to the same partition.

1. Run ``produce-with-keys``, this will start the producer that uses customer name as a key for a message.
2. Run ``consume-show-partitions`` or ``consume-only-judy``. Observe that messages related to specific customers consistently fall into the same partitions.


Resources and additional materials
----------------------------------
#. `Official docs for Apache Kafka <https://kafka.apache.org/>`_.
#. `Official docs for Apache Kafka Connect API <https://kafka.apache.org/documentation/#connect>`_.
#. `Official docs for Apache Kafka Streams <https://kafka.apache.org/documentation/streams/>`_.
#. `A ready fake data generator <https://developer.aiven.io/docs/products/kafka/howto/fake-sample-data.html>`_ to source data into Apache Kafka cluster.
#. `How to use kcat <https://developer.aiven.io/docs/products/kafka/howto/kcat.html>`_. A very handy utility to work with Apache Kafka from command line.
#. `How to use Karapace schema registry <https://aiven.io/blog/what-is-karapace>`_ to align the structure of data coming to Kafka cluster.
#. `How to use Apache Kafka Connect as streaming bridge between different database technologies <https://aiven.io/blog/db-technology-migration-with-apache-kafka-and-kafka-connect>`_.
