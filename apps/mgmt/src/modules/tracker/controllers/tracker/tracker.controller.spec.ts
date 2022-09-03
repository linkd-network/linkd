import { Test, TestingModule } from '@nestjs/testing';
import { TrackerController } from './tracker.controller';

describe('TrackerController', () => {
  let controller: TrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackerController],
    }).compile();

    controller = module.get<TrackerController>(TrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
