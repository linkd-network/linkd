import { Injectable } from '@nestjs/common';
require("dotenv").config();

@Injectable()
export class KafkaHelperService {
  getBrokers() {
    return [`census-kafka:${process.env.KAFKA_PORT}`];
  }
}
