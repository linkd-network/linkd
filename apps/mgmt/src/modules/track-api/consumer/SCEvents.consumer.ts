import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaTopic } from 'src/app.enums';
import { KafkaConsumerService } from 'src/modules/kafka/services/kafka-consumer/kafka-consumer.service';

@Injectable()
export class SCEventsConsumer implements OnModuleInit {
    constructor(private readonly KafkaConsumer: KafkaConsumerService) { }
    onModuleInit() {
        console.log('SCEventsConsumer');
        this.KafkaConsumer.consume({
            topic: { topic: KafkaTopic.SCEvents, fromBeginning: true },
            config: {
                eachMessage: async ({ topic, partition, message }) => {
                    console.log('message')
                    console.log({
                        value: message.value.toString(),
                        topic: topic.toString(),
                        partition: partition.toString(),
                    });

                }
            }
        }).then(res=>{
            console.log('then');
            
        })
    }

}
