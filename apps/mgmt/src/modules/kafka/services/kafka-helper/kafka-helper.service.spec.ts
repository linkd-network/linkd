import { Test, TestingModule } from '@nestjs/testing';
import { KafkaHelperService } from './kafka-helper.service';

describe('KafkaHelperService', () => {
  let service: KafkaHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaHelperService],
    }).compile();

    service = module.get<KafkaHelperService>(KafkaHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
