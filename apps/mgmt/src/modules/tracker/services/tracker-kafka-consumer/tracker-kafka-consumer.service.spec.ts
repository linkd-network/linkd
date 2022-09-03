import { Test, TestingModule } from '@nestjs/testing';
import { TrackerKafkaConsumerService } from './tracker-kafka-consumer.service';

describe('TrackerKafkaConsumerService', () => {
  let service: TrackerKafkaConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackerKafkaConsumerService],
    }).compile();

    service = module.get<TrackerKafkaConsumerService>(TrackerKafkaConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
