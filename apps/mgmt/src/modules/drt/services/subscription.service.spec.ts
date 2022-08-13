import { Test } from '@nestjs/testing';
import { SubscriptionService } from './subscription.service';

describe('Subscription Test suite', () => {
    let Service: SubscriptionService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SubscriptionService],
        }).compile();

        Service = module.get<SubscriptionService>(SubscriptionService);
    });

    it('should be defined', () => {
        expect(Service).toBeDefined();
    });
});