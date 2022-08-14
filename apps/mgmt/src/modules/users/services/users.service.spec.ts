import { Test } from '@nestjs/testing';
import { UserService } from './users.service';

describe('User Test suite', () => {
    let Service: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        Service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(Service).toBeDefined();
    });
});