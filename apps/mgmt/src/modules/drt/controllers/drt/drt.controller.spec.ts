import { Test, TestingModule } from '@nestjs/testing';
import { DrtController } from './drt.controller';

describe('DrtController', () => {
  let controller: DrtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrtController],
    }).compile();

    controller = module.get<DrtController>(DrtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
